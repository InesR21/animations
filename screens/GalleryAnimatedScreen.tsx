import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
const { width, height } = Dimensions.get("screen");

const API_KEY = process.env.EXPO_PEXELS_API_KEY;
const API_URL =
  "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";
const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY as string,
    },
  });
  const results = await data.json();
  return results;
};

const GalleryAnimatedScreen = () => {
  const [images, setImages] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const topRef = useRef<FlatList>(null);
  const thumbRef = useRef<FlatList>(null);

  const scrolltoActiveIndex = (index: number) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPexels();
      setImages(images.photos);
    };
    fetchImages();
  }, []);

  if (!images) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <>
      <StatusBar hidden />
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          ref={topRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(ev) => {
            scrolltoActiveIndex(
              Math.floor(ev.nativeEvent.contentOffset.x / width)
            );
          }}
          renderItem={({ item }) => {
            return (
              <View style={{ width, height }}>
                <Image
                  source={{ uri: item.src.portrait }}
                  style={[StyleSheet.absoluteFillObject]}
                />
              </View>
            );
          }}
        />
        <FlatList
          ref={thumbRef}
          data={images}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ position: "absolute", bottom: IMAGE_SIZE }}
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  scrolltoActiveIndex(index);
                }}
              >
                <Image
                  source={{ uri: item.src.portrait }}
                  style={{
                    width: IMAGE_SIZE,
                    height: IMAGE_SIZE,
                    borderRadius: 12,
                    marginRight: SPACING,
                    borderWidth: 2,
                    borderColor: activeIndex === index ? "#fff" : "transparent",
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </>
  );
};

export default GalleryAnimatedScreen;
