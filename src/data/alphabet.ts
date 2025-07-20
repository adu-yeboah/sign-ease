
export interface Sign {
  id: string;
  name: string;
  category: string;
  description: string;
  images: any[]; 
}

const alphabetData: Sign[] = [
  {
    id: 'A',
    name: 'A',
    category: 'alphabet',
    images: [
      require('../../assets/signs/alphabet/A/angle1.jpg'),
      require('../../assets/signs/alphabet/A/angle2.jpg'),
    ],
    description: 'Form a fist with your thumb pressed against the side of your index finger',
  },
  {
    id: 'B',
    name: 'B',
    category: 'alphabet',
    images: [require('../../assets/signs/alphabet/B/angle1.jpg')],
    description: 'Hold your hand flat with fingers together and thumb tucked in',
  },
  {
    id: 'C',
    name: 'C',
    category: 'alphabet',
    images: [
      require('../../assets/signs/alphabet/C/angle1.jpg'),
      require('../../assets/signs/alphabet/C/angle2.jpg'),
    ],
    description: "Form a curved 'C' shape with your hand",
  },
  {
    id: 'D',
    name: 'D',
    category: 'alphabet',
    images: [require('../../assets/signs/alphabet/D/angle1.jpg')],
    description: 'Point your index finger up with other fingers curled into a fist',
  },
  {
    id: 'E',
    name: 'E',
    category: 'alphabet',
    images: [
      require('../../assets/signs/alphabet/E/angle1.jpg'),
      require('../../assets/signs/alphabet/E/angle2.jpg'),
    ],
    description: 'Press all fingertips together with thumb tucked under',
  },
  {
    id: 'F',
    name: 'F',
    category: 'alphabet',
    images: [require('../../assets/signs/alphabet/F/angle1.jpg')],
    description: 'Touch thumb to index finger while other fingers stay straight',
  },
  {
    id: 'G',
    name: 'G',
    category: 'alphabet',
    images: [require('../../assets/signs/alphabet/G/angle1.jpg')],
    description: 'Point index finger to the side with thumb resting against palm',
  },
];

export default alphabetData;