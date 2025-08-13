import { SignType, SignCategory } from "@/types/sign";

const numbersData: SignType[] = [
  {
    id: '1',
    name: '1',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/1/1.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Hold up your index finger',
    difficulty: 'easy'
  },
  {
    id: '2',
    name: '2',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/2/2.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Hold up your index and middle fingers',
    difficulty: 'easy'
  },
  {
    id: '3',
    name: '3',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/3/3.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Hold up your index, middle, and ring fingers',
    difficulty: 'easy'
  },
  {
    id: '4',
    name: '4',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/4/4.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Hold up all four fingers (no thumb)',
    difficulty: 'easy'
  },
  {
    id: '5',
    name: '5',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/5/5.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Hold up all five fingers with palm facing forward',
    difficulty: 'easy'
  },
  {
    id: '6',
    name: '6',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/6/6.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Touch thumb to pinkie while extending other fingers',
    difficulty: 'medium'
  },
  {
    id: '7',
    name: '7',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/7/7.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Touch thumb to ring finger while extending other fingers',
    difficulty: 'medium'
  },
  {
    id: '8',
    name: '8',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/8/8.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Touch thumb to middle finger while extending other fingers',
    difficulty: 'medium'
  },
  {
    id: '9',
    name: '9',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/9/9.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Touch thumb to index finger while extending other fingers',
    difficulty: 'hard'
  },
  {
    id: '10',
    name: '10',
    category: 'numbers',
    media: [
      {
        uri: require('../../assets/signs/numbers/10/10.png'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Shake your thumb and index finger (like snapping but without sound)',
    difficulty: 'hard'
  }
];

export default numbersData;