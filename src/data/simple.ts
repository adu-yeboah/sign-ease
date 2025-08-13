import { SignType } from "@/types/sign";

export const simpleData: SignType[] = [
  {
    id: 'accra',
    name: 'Accra',
    media: [{
      uri: require('../../assets/signs/simple/accra/ACCRA.mp4'),
      type: 'video'
    }],
    category: 'simple',
    description: 'Capital City of Ghana, ACCRA',
    learned: false,
  },
  {
    id: 'about',
    name: 'About',
    media: [{
      uri: require('../../assets/signs/simple/about/ABOUT.mp4'),
      type: 'video'
    }],
    category: 'simple',
    description: 'Sign for the word ABOUT',
    learned: false,
  },
  {
    id: 'africa',
    name: 'Africa',
    media: [{
      uri: require('../../assets/signs/simple/africa/AFRICA.mp4'),
      type: 'video'
    }],
    category: 'simple',
    description: 'Sign for the word AFRICA',
    learned: false,
  },
  {
    id: 'agree',
    name: 'Agree',
    media: [{
      uri: require('../../assets/signs/simple/agree/AGREE.mp4'),
      type: 'video'
    }],
    category: 'simple',
    description: 'Sign for the word AGREE',
    learned: false,
  },
  {
    id: 'amen',
    name: 'Amen',
    media: [{
      uri: require('../../assets/signs/simple/amen/AMEN.mp4'),
      type: 'video'
    }],
    category: 'simple',
    description: 'Sign for the word AMEN',
    learned: false,
  },
  {
    id: 'angry',
    name: 'Angry',
    media: [{
      uri: require('../../assets/signs/simple/angry/ANGRY.mp4'),
      type: 'video'
    }],
    category: 'simple',
    description: 'Sign for the word ANGRY',
    learned: false,
  },
];