import { SignType, SignCategory } from "@/types/sign";

const greetingsData: SignType[] = [
  {
    id: 'AFTERNOON',
    name: 'Good Afternoon',
    category: 'greetings',
    media: [
      {
        uri: require('../../assets/signs/greetings/AFTERNOON/AFTERNOON.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Place flat hand at forehead and move outward',
    difficulty: 'easy'
  },
  {
    id: 'MORNING',
    name: 'Good Morning',
    category: 'greetings',
    media: [
      {
        uri: require('../../assets/signs/greetings/MORNING/MORNING.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Raise hand up as if greeting the rising sun',
    difficulty: 'easy'
  },
  {
    id: 'SORRY',
    name: 'Sorry',
    category: 'greetings',
    media: [
      {
        uri: require('../../assets/signs/greetings/SORRY/SORRY.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Make circular motion on chest with flat hand',
    difficulty: 'medium'
  },
  {
    id: 'THANK_YOU',
    name: 'Thank You',
    category: 'greetings',
    media: [
      {
        uri: require('../../assets/signs/greetings/THANK_YOU/THANK_YOU.mp4'),
        type: 'video'
      }
    ],
    learned: false,
    description: 'Bring fingers to chin and move hand forward',
    difficulty: 'easy'
  }
];

export default greetingsData;