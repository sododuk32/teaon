
/**
 * debounce 함수는 입력된 시간(ms) 이후 입력된 함수를 실행합니다.
 * @param func 디바운스할 함수
 * @param time 디바운스할 시간(ms)
 * @returns 디바운스된 함수
 * 
*요약: 입력된 time/ms 시간 이후 입력된 func을 실행한다.
* F extends (...args: any[]) => any는 F라는 타입 매개변수가 함수 타입((...args: any[]) => any)으로 확장되도록 제한합니다. 
* 이렇게 하면, F가 함수 타입임을 보장하고 함수 타입에서 사용 가능한 매개변수와 반환값의 타입들을 사용할 수 있게 됩니다.
* ReturnType<typeof setTimeout>은 setTimeout 함수가 반환하는 타이머 ID의 타입을 추론합니다. 
* let timeout: ReturnType<typeof setTimeout>은 timeout 변수를 setTimeout 함수가 반환하는 타이머 ID의 타입으로 선언함을 의미합니다.
* ThisParameterType<F>와 Parameters<F>는 F 타입의 첫 번째 매개변수(함수 호출 시 this로 전달되는 값)와 나머지 매개변수의 타입들을 추론합니다.
* 즉 이 debounce 함수는 인자로 전달된 함수 func을 디바운스된 함수로 래핑시켜주는 함수이다.
*/
function debounce<F extends (...args: any[]) => any>(func: F, time: number) {
    let timeout: ReturnType<typeof setTimeout>;
  
    
    return function(this: ThisParameterType<F>, ...args: Parameters<F>): void {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(this, args);
      }, time);
    };
  }

export default debounce;