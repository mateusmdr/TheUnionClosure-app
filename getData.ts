import credentials from './credentials';

import { stringify } from 'query-string';

const getToken = async () => {
  const path = credentials.API_URL + '/api/security/token';

  const username = credentials.API_USERNAME;
  const password = credentials.API_PASSWORD;

  const response = await fetch(path,{
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: username,
        password: password
    })
  });
  if(response.status===200){
    const token = (await response.json()).token;
    return token;
  }
  throw response.status;
}

const getAvailableDates = async () => {
  const token = await getToken();

  const path = credentials.API_URL + '/api/v1/xFechamentoDatas';
  const response = await fetch(path,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if(response.status===200){
    const availableDates = await response.json();
    return availableDates.map((item: {datas: string}) => (new Date(item.datas)).valueOf());
  }
  throw response.status;
}

const getOperacionalTotal = async (token: string,date: string) => {
  const path = credentials.API_URL + '/api/v1/xOperacionalTotal';
  const params = {data: date};
  
  const query = path +'?'+ stringify(params);
  const response = await fetch(query,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if(response.status===200){
    const operacionalTotal = await response.json();
    return operacionalTotal;
  }
  throw response.status;
}

const getOperacionalReceita = async (token: string,date: string) => {
  const path = credentials.API_URL + '/api/v1/xOperacionalReceita';
  const params = {data: date};
  
  const query = path +'?'+ stringify(params);
  const response = await fetch(query,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if(response.status===200){
    const operacionalReceita = await response.json();
    return operacionalReceita;
  }
  throw response.status;
}

const getOperacionalDespesas = async (token: string,date: string) => {
  const path = credentials.API_URL + '/api/v1/xOperacionalDespesas';
  const params = {data: date};
  
  const query = path +'?'+ stringify(params);
  const response = await fetch(query,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if(response.status===200){
    const operacionalDespesas = await response.json();
    return operacionalDespesas;
  }
  throw response.status;
}

const getOperacionalDespesasClube = async (token: string,date: string) => {
  const path = credentials.API_URL + '/api/v1/xOperacionalDespesasClube';
  const params = {data: date};
  
  const query = path +'?'+ stringify(params);
  const response = await fetch(query,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if(response.status===200){
    const operacionalDespesasClube = await response.json();
    return operacionalDespesasClube;
  }
  throw response.status;
};

const getRakeTotal = async (token: string,date: string) => {
  const path = credentials.API_URL + '/api/v1/xRakeTotal';
  const params = {data: date};
  
  const query = path +'?'+ stringify(params);
  const response = await fetch(query,{
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });
  if(response.status===200){
    const rakeTotal = (await response.json())[0].xrake_total;
    return rakeTotal;
  }
  throw response.status;
};

const formatCurrency = (value: string) => {
  const converted = Number(value);
  if (converted === 0) return '-';

  return (converted.toFixed(2).toString().replace('.',',').replace(/\B(?=(\d{3})+(?!\d))/g, '.'));
}

const formatPercentage = (value: string) => {
  const converted = Number(value);
  return ((converted.toFixed(2) + '%')).replace('.',',');
}

const getData = async (date:string) => {
  const token = await getToken();
  const sum = (prev: any, next: any) => Number(prev) + Number(next);

  const operacionalTotal = await getOperacionalTotal(token, date);
  const operacionalReceita = await getOperacionalReceita(token, date);
  const operacionalDespesas = await getOperacionalDespesas(token, date);
  const operacionalDespesasClube = await getOperacionalDespesasClube(token, date);
  const rakeTotal = await getRakeTotal(token,date);

  let clubs = operacionalDespesasClube.map((item: any) => item.clube)
    .filter((value:number, index:number, self:any) => self.indexOf(value) === index);

  let briefDescriptions = (operacionalDespesasClube.map((item:any) => item.descricao)
  .filter((value:number, index:number, self:any) => self.indexOf(value) === index));
  
  const briefSources = briefDescriptions.map((description: string)=> {
    return {
      description: description,
      value: operacionalDespesasClube.filter((item:any) => item.descricao === description)
        .map((item:any) => item.valor)
        .reduce(sum),
      percentage: ''
    }
  });

  const data = {
    bigCards: [
      {
        title: 'Total', sources:[
          {description: operacionalTotal[0].descritivo, value: formatCurrency(operacionalTotal[0].valor), percentage: ""},
          {description: operacionalTotal[1].descritivo, value: formatCurrency(operacionalTotal[1].valor), percentage: ""}
        ],
        total: {description: "", value: formatCurrency(operacionalTotal[2].valor), percentage: formatPercentage(operacionalTotal[3].valor)}
      },
      {
        title: 'Receita', sources: (
          operacionalReceita.map((obj: any) => {
            return {description: obj.clube, value: formatCurrency(obj.rake), percentage: ""}
          })
        ),
        total: {description: '', value: formatCurrency(operacionalTotal[0].valor), percentage: ''}
      },
      {
        title: 'Despesas', sources: (
          operacionalDespesas.map((obj: any) => {
            return {
              description: obj.clube,
              value: formatCurrency(obj.rake),
              percentage: formatPercentage((Number(obj.rake)/rakeTotal * 100).toString())
            }
          })
        ),
        total: {
          description: '',
          value: formatCurrency(operacionalTotal[1].valor),
          percentage: formatPercentage((Number(
            operacionalDespesas.map((item: any) => item.rake)
              .reduce(sum)
          )/rakeTotal * 100).toString())
        }
      }
    ],
    smallCards: ( 
      clubs.map((club: any) => {
        return {
          title: 'Despesas '+ club,
          sources: (operacionalDespesasClube.filter((item:any) => item.clube === club)
            .map((item: any) => {
              return {description: item.descricao, value: formatCurrency(item.valor)};
            })
          ),
          total: {
            description: '',
            value: formatCurrency(
              operacionalDespesasClube.filter((item:any) => item.clube === club)
                .map((item: any) => item.valor)
                .reduce(sum))
            , percentage: ''}
        }
      })
    ).concat(
      [{
        title: 'Despesas The Union Resumo',
        sources: briefSources.map((item:any) => {
          return {
            description: item.description,
            value: formatCurrency(item.value),
            percentage: item.percentage,
          }
        }),
        total: {
          description: '',
          value: formatCurrency(
            briefSources.map((item:any) => item.value)
              .reduce(sum)
          ),
          percentage: ''
        }
      }]
    )
  }
  return data;
};

export {getData, getAvailableDates};