import { SignType, SignCategory } from "@/types/sign";

const alphabetData: SignType[] = [
  {
    id: 'A',
    name: 'A',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/A/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/A/angle2.jpg'),
        type: 'image'
      },
      // Add video if available:
      // {
      //   uri: require('../../assets/signs/alphabet/A/demo.mp4'),
      //   type: 'video'
      // }
    ],
    learned: false,
    description: 'Form a fist with your thumb pressed against the side of your index finger',
    difficulty: 'easy'
  },
  {
    id: 'B',
    name: 'B',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/B/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/B/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Hold your hand flat with fingers together and thumb tucked in',
    difficulty: 'easy'
  },
  {
    id: 'C',
    name: 'C',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/C/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/C/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: "Form a curved 'C' shape with your hand",
    difficulty: 'easy'
  },
  {
    id: 'D',
    name: 'D',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/D/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/D/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Point your index finger up with other fingers curled into a fist',
    difficulty: 'easy'
  },
  {
    id: 'E',
    name: 'E',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/E/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/E/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Press all fingertips together with thumb tucked under',
    difficulty: 'medium'
  },
  {
    id: 'F',
    name: 'F',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/F/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/F/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Touch thumb to index finger while other fingers stay straight',
    difficulty: 'medium'
  },
  {
    id: 'G',
    name: 'G',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/G/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/G/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Point index finger to the side with thumb resting against palm',
    difficulty: 'medium'
  },
  {
    id: 'H',
    name: 'H',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/H/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/H/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Point index and middle fingers to the side with thumb between them',
    difficulty: 'medium'
  },
  {
    id: 'I',
    name: 'I',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/I/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/I/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Pinkie finger extended upward with other fingers curled into fist',
    difficulty: 'easy'
  },
  {
    id: 'J',
    name: 'J',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/J/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/J/angle2.jpg'),
        type: 'image'
      },
      // Example of adding a video:
      // {
      //   uri: require('../../assets/signs/alphabet/J/demo.mp4'),
      //   type: 'video'
      // }
    ],
    learned: false,
    description: 'Pinkie extended, then draw a "J" shape in the air',
    difficulty: 'hard'
  },
  {
    id: 'K',
    name: 'K',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/K/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/K/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Index and middle fingers extended upward with thumb between them',
    difficulty: 'hard'
  },
  {
    id: 'L',
    name: 'L',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/L/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/L/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Form an "L" shape with thumb and index finger extended',
    difficulty: 'easy'
  },
  {
    id: 'M',
    name: 'M',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/M/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/M/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Curl fingers into a fist with thumb under index, middle, and ring fingers',
    difficulty: 'medium'
  },
  {
    id: 'N',
    name: 'N',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/N/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/N/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Curl fingers into a fist with thumb under index and middle fingers',
    difficulty: 'medium'
  },
  {
    id: 'O',
    name: 'O',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/O/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/O/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Form a circle with all fingers and thumb touching at tips',
    difficulty: 'easy'
  },
  {
    id: 'P',
    name: 'P',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/P/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/P/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Index and middle fingers extended downward with thumb between them',
    difficulty: 'hard'
  },
  {
    id: 'Q',
    name: 'Q',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/Q/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/Q/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Point index finger and thumb downward to form a "Q" shape',
    difficulty: 'hard'
  },
  {
    id: 'R',
    name: 'R',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/R/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/R/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Cross index and middle fingers with other fingers curled down',
    difficulty: 'medium'
  },
  {
    id: 'S',
    name: 'S',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/S/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/S/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Form a fist with thumb wrapped over fingers',
    difficulty: 'easy'
  },
  {
    id: 'T',
    name: 'T',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/T/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/T/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Curl fingers into a fist with thumb under index finger',
    difficulty: 'medium'
  },
  {
    id: 'U',
    name: 'U',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/U/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/U/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Raise index and middle fingers together with other fingers curled',
    difficulty: 'easy'
  },
  {
    id: 'V',
    name: 'V',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/V/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/V/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Raise index and middle fingers apart in a "V" shape',
    difficulty: 'easy'
  },
  {
    id: 'W',
    name: 'W',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/W/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/W/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Raise index, middle, and ring fingers apart with thumb holding pinkie',
    difficulty: 'medium'
  },
  {
    id: 'X',
    name: 'X',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/X/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/X/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Bend index finger into a hook with other fingers curled',
    difficulty: 'medium'
  },
  {
    id: 'Y',
    name: 'Y',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/Y/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/Y/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Extend thumb and pinkie to form a "Y" shape',
    difficulty: 'easy'
  },
  {
    id: 'Z',
    name: 'Z',
    category: 'alphabet',
    media: [
      {
        uri: require('../../assets/signs/alphabet/Z/angle1.jpg'),
        type: 'image'
      },
      {
        uri: require('../../assets/signs/alphabet/Z/angle2.jpg'),
        type: 'image'
      }
    ],
    learned: false,
    description: 'Draw a "Z" shape in the air with index finger',
    difficulty: 'hard'
  }
];

export default alphabetData;