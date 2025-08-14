import React, { useCallback, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import Carousel from "react-native-reanimated-carousel";
import * as Animatable from "react-native-animatable";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import SafeWrapper from "@/components/ui/SafeWrapper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/types/utils";
import { useSign } from "@/hooks/useSign";
import { SignMedia } from "@/types/sign";
import Loading from "@/components/ui/Loading";

const { width: screenWidth } = Dimensions.get("window");
type SignDetailNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "SignDetail"
>;

const SignDetailScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<SignDetailNavigationProp>();
  const { signId } = route.params;
  const { signs, markAsLearned, loading } = useSign();

  const sign = useMemo(() => signs.find((s) => s.id === signId), [signs, signId]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const safeMedia = useMemo(() => sign?.media || [], [sign]);
  const hasMedia = safeMedia.length > 0;


  const getCategoryColor = () => {
    if (!sign) return "bg-accent-500";
    switch (sign.category) {
      case "alphabet": return "bg-purple-500";
      case "numbers": return "bg-blue-500";
      case "animals": return "bg-green-500";
      case "food": return "bg-red-500";
      case "greetings": return "bg-yellow-500";
      case "family": return "bg-pink-500";
      case "simple": return "bg-orange-500";
      case "actions": return "bg-cyan-500";
      default: return "bg-accent-500";
    }
  };

  const speakDescription = useCallback(() => {
    if (sign?.description) {
      Speech.stop();
      Speech.speak(sign.description, { rate: 0.9, pitch: 1.1 });
    }
  }, [sign]);

  const handleLearned = async () => {

    if (sign) {
      await markAsLearned(sign.id, sign.category);
      navigation.goBack();
    }
  };

  const renderMediaItem = ({ item, index }: { item: SignMedia; index: number }) => {
    if (item.type === "video") {
      const player = useVideoPlayer(item.uri, (p) => {
        p.loop = true;
        if (index === currentMediaIndex) {
          p.play();
        } else {
          p.pause();
        }
      });

      return (
        <View className="relative w-full h-72 items-center justify-center">
          <VideoView
            player={player}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
              backgroundColor: '#00000020'
            }}
            contentFit="contain"
          />
          <TouchableOpacity
            className="absolute bottom-4 right-4 bg-white/80 rounded-full p-2"
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
              setIsPlaying(!isPlaying);
            }}
          >
            <Ionicons
              name={isPlaying ? "pause" : "play"}
              size={24}
              color="#8B5CF6"
            />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View className="flex-1 items-center justify-center">
          <Image
            source={item.uri}
            style={{
              width: "100%",
              height: 280,
              borderRadius: 16,
              maxWidth: 300
            }}
            resizeMode="contain"
          />
        </View>
      );
    }
  };

  if (loading) {
    return <Loading />
  }


  if (!sign) {
    return (
      <SafeWrapper>
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-800">Sign not found.</Text>
        </View>
      </SafeWrapper>
    );
  }

  return (
    <SafeWrapper>
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 pt-4 pb-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={26} color="#8B5CF6" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Sign Details</Text>
        <TouchableOpacity onPress={speakDescription}>
          <Ionicons name="volume-high" size={26} color="#8B5CF6" />
        </TouchableOpacity>
      </View>

      <View className="flex-1 px-6">
        {/* Media Carousel */}
        <Animatable.View
          animation="fadeIn"
          duration={800}
          className={`rounded-2xl ${getCategoryColor()} p-6 mb-6`}
        >
          <View className="items-center">
            <Text className="text-3xl font-bold text-white text-center mb-1">
              {sign.name}
            </Text>
            <Text className="text-white/80 text-center mb-4">
              {sign.category.charAt(0).toUpperCase() + sign.category.slice(1)}
            </Text>

            <View className="bg-white/20 rounded-xl w-full h-72 items-center justify-center">
              {hasMedia ? (
                <Carousel
                  loop
                  width={screenWidth - 80}
                  height={288}
                  data={safeMedia}
                  renderItem={renderMediaItem}
                  autoPlay={false}
                  scrollAnimationDuration={500}
                  onSnapToItem={setCurrentMediaIndex}
                />
              ) : (
                <View className="flex-1 items-center justify-center">
                  <Ionicons name="warning" size={40} color="white" />
                  <Text className="text-white mt-2">No media available</Text>
                </View>
              )}
            </View>
          </View>
        </Animatable.View>

        {/* Sign Info */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={200}
          className="bg-white rounded-2xl p-6 mb-6 shadow-sm"
        >
          <Text className="text-lg font-bold text-gray-800 mb-3">
            About This Sign
          </Text>
          <Text className="text-gray-600 text-base leading-6">
            {sign.description || "No description available."}
          </Text>
        </Animatable.View>

        {/* Actions */}
        <Animatable.View
          animation="fadeInUp"
          duration={800}
          delay={400}
          className="flex-row gap-4"
        >
          <TouchableOpacity
            className="flex-1 bg-purple-500 py-3 rounded-xl items-center"
            onPress={handleLearned}
          >
            <Text className="text-white font-bold">I Learned This!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-yellow-400 py-3 rounded-xl items-center"
            onPress={() => navigation.navigate("Quiz", { signId: sign.id })}
          >
            <Text className="text-gray-800 font-bold">Test Me</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeWrapper>
  );
};

export default SignDetailScreen;