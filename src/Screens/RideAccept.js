import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const {width} = Dimensions.get('window');

const RiderSearchingScreen = ({navigation}) => {
  const [progress, setProgress] = useState(0);
  const [selectedAmount, setSelectedAmount] =
    useState(null);

  const ripple1 = useRef(
    new Animated.Value(0),
  ).current;

  const ripple2 = useRef(
    new Animated.Value(0),
  ).current;

  const ripple3 = useRef(
    new Animated.Value(0),
  ).current;

  const amounts = [
    '₹20',
    '₹30',
    '₹40',
    '₹50',
  ];

  useEffect(() => {
    startRipple(ripple1, 0);
    startRipple(ripple2, 1000);
    startRipple(ripple3, 2000);

    let value = 0;

    const interval = setInterval(() => {
      value += 10;

      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          navigation.replace(
            'DriverArriving',
          );
        }, 1000);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const startRipple = (
    animatedValue,
    delay,
  ) => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const rippleStyle = animatedValue => ({
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 4],
        }),
      },
    ],
    opacity: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 0],
    }),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* MAP */}

      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        />
        <Animated.View
          style={[
            styles.ripple,
            rippleStyle(ripple1),
          ]}
        />

        <Animated.View
          style={[
            styles.ripple,
            rippleStyle(ripple2),
          ]}
        />

        <Animated.View
          style={[
            styles.ripple,
            rippleStyle(ripple3),
          ]}
        />

        <View style={styles.marker}>
          <View
            style={styles.innerMarker}
          />
        </View>
      </View>

      {/* BOTTOM SHEET */}

      <View style={styles.bottomSheet}>
        <View style={styles.dragger} />

        <Text style={styles.title}>
          Finding your driver...
        </Text>

        {/* PROGRESS */}

        <View style={styles.progressBg}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress}%`,
              },
            ]}
          />
        </View>

        <View style={styles.rewardIcon}>
          <Text
            style={{fontSize: 50}}>
            💸
          </Text>
        </View>

        <Text style={styles.subText}>
          Add a tip to match with a driver faster!
        </Text>

        {/* ADDON */}

        <View style={styles.amountRow}>
          {amounts.map(item => {
            const selected =
              selectedAmount === item;

            return (
              <TouchableOpacity
                key={item}
                onPress={() =>
                  setSelectedAmount(
                    item,
                  )
                }
                style={[
                  styles.amountCard,
                  selected &&
                    styles.selectedAmount,
                ]}>
                <Text
                  style={[
                    styles.amountText,
                    selected && {
                      color: '#fff',
                    },
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          style={styles.addOnBtn}>
          <Text
            style={styles.addOnText}>
            Custom Tip Amount ▼
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RiderSearchingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  mapContainer: {
    flex: 1,
    backgroundColor: '#DDE4EA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  map: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  ripple: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#0a6c7b',
  },

  marker: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: '#000',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerMarker: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0a6c7b',
  },

  bottomSheet: {
    height: 350,
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  dragger: {
    width: 60,
    height: 5,
    borderRadius: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
    textAlign: 'center',
    marginTop: 20,
  },

  progressBg: {
    height: 8,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 20,
  },

  progressFill: {
    height: 8,
    backgroundColor: '#0a6c7b',
  },

  rewardIcon: {
    alignItems: 'center',
    marginTop: 25,
  },

  subText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    lineHeight: 24,
  },

  amountRow: {
    flexDirection: 'row',
    justifyContent:
      'space-between',
    marginTop: 25,
  },

  amountCard: {
    width: 70,
    height: 55,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },

  selectedAmount: {
    backgroundColor: '#0a6c7b',
    borderColor: '#0a6c7b',
  },

  amountText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },

  addOnBtn: {
    marginTop: 25,
    alignItems: 'center',
  },

  addOnText: {
    color: '#0a6c7b',
    fontSize: 16,
    fontWeight: '700',
  },
});