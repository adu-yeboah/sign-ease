import { SignType, SignCategory } from "@/types/sign";

const foodsData: SignType[] = [
  {
    id: 'BREAD',
    name: 'Bread',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/BREAD/BREAD.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make slicing motions with one hand on the palm of the other',
    difficulty: 'easy'
  },
  {
    id: 'CORN',
    name: 'Corn',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/CORN/CORN.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Hold an imaginary ear of corn and make a twisting motion',
    difficulty: 'medium'
  },
  {
    id: 'KONKONTE',
    name: 'Konkonte',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/KONKONTE/KONKONTE.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make kneading motions with both hands',
    difficulty: 'hard'
  },
  {
    id: 'KONTOMIRE',
    name: 'Kontomire Green Leaves',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/KONTOMIRE_GREEN_LEAVES/KONTOMIRE_GREEN_LEAVES.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Simulate plucking leaves with fingers',
    difficulty: 'medium'
  },
  {
    id: 'SOUP',
    name: 'Soup',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/SOUP/SOUP.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make a stirring motion with one hand in a bowl shape',
    difficulty: 'easy'
  },
  {
    id: 'SPAGHETTI',
    name: 'Spaghetti',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/SPAGHETTI/SPAGHETTI.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Twirl fingers as if spinning spaghetti on a fork',
    difficulty: 'medium'
  },
  {
    id: 'TOMATO',
    name: 'Tomato',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/TOMATO/TOMATO.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Form a round shape with hands and make squeezing motion',
    difficulty: 'easy'
  },
  {
    id: 'WATER',
    name: 'Water',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/WATER/WATER.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make a W shape with fingers near mouth',
    difficulty: 'easy'
  },
  {
    id: 'WATERMELON',
    name: 'Watermelon',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/WATERMELON/WATER_MELON.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Form large round shape with hands then make cutting motion',
    difficulty: 'medium'
  },
  {
    id: 'YAM',
    name: 'Yam',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/YAM/YAM.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make pounding motions with both fists',
    difficulty: 'hard'
  },
  {
    id: 'YOGHURT',
    name: 'Yoghurt',
    category: 'food',
    media: [
      {
        uri: require('../../assets/signs/foods/YOGHURT/YOGHURT.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make scooping motion towards mouth with fingers',
    difficulty: 'easy'
  }
];

export default foodsData;