import recessOrderConfig from 'stylelint-config-recess-order';

// 2. 가져온 설정 객체에서 순서 리스트를 추출합니다.
const recessOrderList = recessOrderConfig.rules['order/properties-order'];

// 3. module.exports 대신 export default를 사용합니다.
export default {
  extends: ['stylelint-config-standard', 'stylelint-config-recess-order'],
  rules: {
    // BEM 네이밍 규칙
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*(-[a-z0-9]+)*(__[a-z0-9]+(-[a-z0-9]+)*)?(--[a-z0-9]+(-[a-z0-9]+)*)?$',
      {
        message:
          '클래스 이름은 BEM 방식(block__element--modifier)을 따라야 합니다.',
      },
    ],

    // 불필요한 우선순위 경고 끄기 (BEM 네이밍 규칙으로 인한)
    'no-descending-specificity': null,

    // 순서 규칙 재정의 (리스트 + 커스텀 메시지)
    'order/properties-order': [
      recessOrderList,
      {
        message:
          '속성은 논리적 순서(Layout → Box → Visual)에 맞춰 작성해주세요.',
      },
    ],
  },
};
