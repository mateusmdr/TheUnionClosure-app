import {API_URL, API_USERNAME, API_PASSWORD} from '@env';

const queryString = ({method, params = null}) => {
    if (!params){
        return `${API_URL}${method}`
    }
    const urlEncoded = new URLSearchParams(params).toString();
    return `${API_URL}${method}?${urlEncoded}`
}

const defaultHeaders = new Headers;
defaultHeaders.append('Accept','application/json');
defaultHeaders.append('Content-Type','application/json');

const authHeaders = ({token}) => {
    const headers = new Headers;
    headers.append('Accept','application/json');
    headers.append('Content-Type','application/json');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
}

const getToken = async () => {
    const response = await fetch(
        queryString({method: 'security/token'}),{
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify({
                username: API_USERNAME,
                password: API_PASSWORD
            })
        }
    );
  
  if(response.ok){
    const token = (await response.json()).token;
    return token;
  }else {
    console.error(JSON.stringify(response));
  }
}

const getAvailableDates = async () => {
  const token = await getToken();
  const response = await fetch(
    queryString({method: 'v1/xFechamentoDatas', params: {id_agente: -1}}),
    {
        method: 'GET',
        headers: authHeaders({token})
    }
  );
  if(response.ok){
    const availableDates = await response.json();
    return availableDates.map((item) => (new Date(item.datas)).valueOf());
  }else {
    console.error(JSON.stringify(response));
  }
}

const getOperacionalTotal = async (token, date) => {
  const response = await fetch(
    queryString({method: 'v1/xOperacionalTotal', params: {data: date}}),
    {
        method: 'GET',
        headers: authHeaders({token})
    }
  );
  if(response.ok){
    const operacionalTotal = await response.json();
    return operacionalTotal;
  }else {
    console.error(JSON.stringify(response));
  }
}

const getOperacionalReceita = async (token, date) => {
	const response = await fetch(
	queryString({method: 'v1/xOperacionalReceita', params: {data: date}}),
	{
		method: 'GET',
		headers: authHeaders({token})
	}
	);
	if(response.ok){
		const operacionalReceita = await response.json();
		return operacionalReceita;
	}else {
		console.error(JSON.stringify(response));
	}
}

const getOperacionalDespesas = async (token,date) => {
  const response = await fetch(
    queryString({method: 'v1/xOperacionalDespesas', params: {data: date}}),
    {
        method: 'GET',
        headers: authHeaders({token})
    }
  );
  if(response.ok){
    const operacionalDespesas = await response.json();
    return operacionalDespesas;
  }else {
    console.error(JSON.stringify(response));
  }
}

const getOperacionalDespesasClube = async (token,date) => {
  const response = await fetch(
    queryString({method: 'v1/xOperacionalDespesasClube', params: {data: date}}),
    {
        method: 'GET',
        headers: authHeaders({token})
    }
  );
  if(response.ok){
    const operacionalDespesasClube = await response.json();
    return operacionalDespesasClube;
  }else {
    console.error(JSON.stringify(response));
  }
};

const getRakeTotal = async (token,date) => {
  const response = await fetch(
    queryString({method: 'v1/xRakeTotal', params: {data: date}}),
    {
        method: 'GET',
        headers: authHeaders({token})
    }
  );
  if(response.ok){
    const rakeTotal = (await response.json())[0].xrake_total;
    return rakeTotal;
  }else {
    console.error(JSON.stringify(response));
  }
};

const formatCurrency = (value) => {
	if(!value) return '0,00';
	const converted = Number(value);
	if (converted === 0) return '-';

	return (converted.toFixed(2).toString().replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
}

const formatPercentage = (value) => {
	if(!value) return ''
	const converted = Number(value);
	return ((converted.toFixed(2) + '%')).replace('.',',');
}

const getData = async (date) => {
  const token = await getToken();
  const sum = (prev, next) => Number(prev) + Number(next);

  const operacionalTotal = await getOperacionalTotal(token, date);
  const operacionalReceita = await getOperacionalReceita(token, date);
  const operacionalDespesas = await getOperacionalDespesas(token, date);
  const operacionalDespesasClube = await getOperacionalDespesasClube(token, date);
  const rakeTotal = await getRakeTotal(token,date);
  let clubs = operacionalDespesasClube.map((item) => item.clube)
    .filter((value, index, self) => self.indexOf(value) === index);

  let briefDescriptions = (operacionalDespesasClube.map((item) => item.descricao)
  	.filter((value, index, self) => self.indexOf(value) === index));

  const briefSources = briefDescriptions.map((description)=> {
    return {
      description: description,
      value: operacionalDespesasClube.filter((item) => item.descricao === description)
        .map((item) => item.valor)
        .reduce(sum, 0),
      percentage: ''
    }
  });
  const data ={
    bigCards: [
      {
        title: 'Total', sources:[
          {description: operacionalTotal[0]?.descritivo, value: formatCurrency(operacionalTotal[0]?.valor), percentage: ""},
          {description: operacionalTotal[1]?.descritivo, value: formatCurrency(operacionalTotal[1]?.valor), percentage: ""}
        ],
        total: {description: "", value: formatCurrency(operacionalTotal[0]?.valor + operacionalTotal[1]?.valor), percentage: formatPercentage(operacionalTotal[3]?.valor)}
      },
      {
        title: 'Receita', sources: (
          operacionalReceita.map((obj) => {
            return {description: obj.clube, value: formatCurrency(obj.rake), percentage: ""}
          })
        ),
        total: {description: '', value: formatCurrency(operacionalTotal[0]?.valor), percentage: ''}
      },
      {
        title: 'Despesas', sources: (
          operacionalDespesas.map((obj) => {
            return {
              description: obj.clube,
              value: formatCurrency(obj.rake),
              percentage: formatPercentage((Number(obj.rake)/rakeTotal * 100).toString())
            }
          })
        ),
        total: {
          description: '',
          value: formatCurrency(operacionalTotal[1]?.valor),
          percentage: formatPercentage((Number(
            operacionalDespesas.map((item) => item.rake)
              .reduce(sum,0)
          )/rakeTotal * 100).toString())
        }
      }
    ],
    smallCards: ( 
      clubs.map((club) => {
        return {
          title: 'Despesas '+ club,
          sources: (operacionalDespesasClube.filter((item) => item.clube === club)
            .map((item) => {
              return {description: item.descricao, value: formatCurrency(item.valor)};
            })
          ),
          total: {
            description: '',
            value: formatCurrency(
              operacionalDespesasClube.filter((item) => item.clube === club)
                .map((item) => item.valor)
                .reduce(sum, 0))
            , percentage: ''}
        }
      })
    ).concat(
      [{
        title: 'Despesas The Union Resumo',
        sources: briefSources.map((item) => {
          return {
            description: item.description,
            value: formatCurrency(item.value),
            percentage: item.percentage,
          }
        }),
        total: {
          description: '',
          value: formatCurrency(
            briefSources.map((item) => item.value)
              .reduce(sum,0)
          ),
          percentage: ''
        }
      }]
    )
  };

  return data;
};

export {getData, getAvailableDates};