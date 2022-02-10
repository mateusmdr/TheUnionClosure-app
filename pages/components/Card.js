import {View, Text} from 'react-native';

import {styles} from '../styles/stylesheet';

const isGreen = (title, description) => {
    return (
      description.toLowerCase() === 'receita' ||
      (description === '' && title.toLowerCase() === 'receita') ||
      (description === '' && title.toLowerCase() === 'total')
    );
};
const isRed = (title, description) => {
    return (
        description.toLowerCase() === 'despesas' ||
        (description === '' && title.toLowerCase().includes('despesas'))
    );
};

const colorStyle = (title, description) => {
    if (isGreen(title, description)) {
        return styles.CardRevenueText;
    }

    if (isRed(title, description)) {
        return styles.CardExpenseText;
    }

    return styles.CardNeutralText;
};

const Card = ({title, sources, total, isBig}) => {
    return (
      <View style={isBig ? styles.BigCard : styles.SmallCard}>
        <Text style={styles.CardTitle}>{title}</Text>
        <View>
          {Object.entries(sources).map(([key, source]) => {
            return (
              <View key={key} style={styles.BigCardContentRow}>
                <View style={styles.CardDescriptionContainer}>
                  <Text style={styles.CardDescription}>{source.description}</Text>
                </View>
                <View>
                  <Text style={colorStyle(title, source.description)}>
                    R$
                  </Text>
                </View>
                <View
                  style={
                    isBig
                      ? styles.BigCardValueContainer
                      : styles.SmallCardValueContainer
                  }>
                  <Text style={colorStyle(title, source.description)}>
                    {source.value}
                  </Text>
                </View>
                {isBig && (
                  <View style={styles.CardPercentageContainer}>
                    <Text style={styles.CardPercentageText}>
                      {source.percentage}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
          <View key={'marker'} style={styles.BigCardContentRow}>
            <View style={styles.CardDescriptionContainer} />
            <View />
            <View
              style={
                isBig
                  ? styles.BigCardMarkerContainer
                  : styles.SmallCardMarkerContainer
              }>
              <Text style={styles.CardMarkerText}>............</Text>
            </View>
            {isBig && <View style={styles.CardPercentageContainer} />}
          </View>
          <View key={'total'} style={styles.BigCardContentRow}>
            <View style={styles.CardDescriptionContainer}>
              <Text style={styles.CardDescription}>
                {total.description}
              </Text>
            </View>
            <View>
              <Text style={colorStyle(title, total.description)}>
                R$
              </Text>
            </View>
            <View
              style={
                isBig
                  ? styles.BigCardValueContainer
                  : styles.SmallCardValueContainer
              }>
              <Text style={colorStyle(title, total.description)}>
                {total.value}
              </Text>
            </View>
            {isBig && (
              <View style={styles.CardPercentageContainer}>
                <Text style={styles.CardPercentageText}>
                  {total.percentage}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
};

export default Card;