// lib/address.ts

export type Address = {
  postCode: string;
  city: string;
  state: string;
  address: string;
};


type DaumPostcodeData = {
  zonecode: string;
  roadAddress: string;
  jibunAddress: string;
  userSelectedType: "R" | "J";
  bname: string;
  buildingName: string;
  apartment: "Y" | "N";
  sido: string;
  sigungu: string;
};

declare global {
  interface Window {
    daum: any;
  }
}

/**
 * Daum 주소 검색 팝업을 열고,
 * 사용자가 주소를 선택하면 Promise로 결과를 반환한다.
 */
export const findAddress = (): Promise<Address> => {
  return new Promise((resolve) => {
    new window.daum.Postcode({
      oncomplete: (data: DaumPostcodeData) => {
        let address = "";
        let extraAddress = "";

        // 도로명 / 지번 주소 분기
        if (data.userSelectedType === "R") {
          // 도로명 주소: "서울 강남구 테헤란로 123"
          // → "테헤란로 123"
          const parts = data.roadAddress.split(" ");
          address = parts.slice(-2).join(" ");
        } else {
          // 지번 주소 fallback (그대로 유지)
          address = data.jibunAddress;
        }

        // 참고 주소 처리 (도로명일 경우)
        if (data.userSelectedType === "R") {
          if (data.bname && /[동|로|가]$/g.test(data.bname)) {
            extraAddress += data.bname;
          }

          if (data.buildingName && data.apartment === "Y") {
            extraAddress += extraAddress
              ? `, ${data.buildingName}`
              : data.buildingName;
          }

          if (extraAddress) {
            extraAddress = `(${extraAddress})`;
          }
        }

        resolve({
          postCode: data.zonecode,
          address,
          city: data.sido,
          state: data.sigungu
        });
      },
    }).open();
  });
};