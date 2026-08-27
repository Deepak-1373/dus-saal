import type { Lang } from './lang';

const en = {
  langName: 'हिं',
  langSwitchLabel: 'हिंदी में पढ़ें',
  about: 'About this demo',
  englishOnly: 'This section is in English only.',

  landingHeadline: 'Changed jobs? Your PF years may not be counting.',
  landingPrimary: 'Check my service record',
  landingSecondary: 'How this works',

  signInTitle: 'Sign in',
  signInContinue: 'Continue',
  signInOrScenario: 'Or try a scenario',

  verdictEyebrow: 'Your recognised service',
  verdictWhy: 'Why',
  verdictNeed: 'You need {target} for a monthly pension for life.',
  verdictCompare: "You've worked {believed}. {gap} of that isn't being counted.",
  verdictAllCounting: "Every month you've worked is counting. Nothing is stuck.",
  verdictFix: 'Fix this',
  verdictAllClear: 'See how your years add up',
  verdictShowDetails: 'Show technical details',

  statusPass: 'In order',
  statusFail: 'Needs fixing',
  statusNotApplicable: 'Not needed',

  ledgerCounting: 'Counting',
  ledgerNotCounting: 'Not counting',
  ledgerAhead: 'Still ahead',

  fixWhatToDo: 'What to do',
  fixHowLong: 'How long it takes',
  fixIfNotWork: "If that doesn't work",
  fixSeeHistory: 'See my job history',
  fixBackToVerdict: 'Back to your verdict',
  fixAlreadyInOrder: 'Already in order',

  timelineTitle: 'Your job history',
  timelineTrack: 'Track a fix request',

  trackerTitle: 'Where your request is',
  trackerNothing: 'Nothing is in progress',

  aboutTitle: 'About this demo',
  aboutBack: 'Back to the start',
} as const;

const hi: Record<keyof typeof en, string> = {
  langName: 'EN',
  langSwitchLabel: 'Read in English',
  about: 'इस डेमो के बारे में',
  englishOnly: 'यह हिस्सा केवल अंग्रेज़ी में है।',

  landingHeadline: 'नौकरी बदली? हो सकता है आपके PF साल गिने न जा रहे हों।',
  landingPrimary: 'मेरा सेवा रिकॉर्ड देखें',
  landingSecondary: 'यह कैसे काम करता है',

  signInTitle: 'साइन इन',
  signInContinue: 'आगे बढ़ें',
  signInOrScenario: 'या कोई परिस्थिति देखें',

  verdictEyebrow: 'आपकी मान्य सेवा',
  verdictWhy: 'क्यों',
  verdictNeed: 'जीवन भर मासिक पेंशन के लिए {target} चाहिए।',
  verdictCompare: 'आपने {believed} काम किया है। उसमें से {gap} गिने नहीं जा रहे।',
  verdictAllCounting: 'आपने जितने महीने काम किया, सब गिने जा रहे हैं। कुछ भी अटका नहीं है।',
  verdictFix: 'इसे ठीक करें',
  verdictAllClear: 'देखें आपके साल कैसे जुड़ते हैं',
  verdictShowDetails: 'तकनीकी जानकारी देखें',

  statusPass: 'ठीक है',
  statusFail: 'ठीक करना है',
  statusNotApplicable: 'ज़रूरत नहीं',

  ledgerCounting: 'गिने जा रहे',
  ledgerNotCounting: 'नहीं गिने जा रहे',
  ledgerAhead: 'अभी बाकी',

  fixWhatToDo: 'क्या करना है',
  fixHowLong: 'कितना समय लगेगा',
  fixIfNotWork: 'अगर यह काम न करे',
  fixSeeHistory: 'मेरा नौकरी इतिहास देखें',
  fixBackToVerdict: 'अपने नतीजे पर लौटें',
  fixAlreadyInOrder: 'पहले से ठीक है',

  timelineTitle: 'आपका नौकरी इतिहास',
  timelineTrack: 'अनुरोध की स्थिति देखें',

  trackerTitle: 'आपका अनुरोध कहाँ है',
  trackerNothing: 'कुछ भी प्रक्रिया में नहीं है',

  aboutTitle: 'इस डेमो के बारे में',
  aboutBack: 'शुरुआत पर लौटें',
};

export type StringKey = keyof typeof en;

export const STRINGS: Record<Lang, Record<StringKey, string>> = { en, hi };
