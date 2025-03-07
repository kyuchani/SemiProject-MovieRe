const Privacy = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 " style={{ marginTop: '200px' }}>
        개인정보처리방침
      </h1>
      <p>본 개인정보처리방침은 이용자의 개인정보 보호와 관련하여 회사의 정책을 안내합니다.</p>

      <h2 className="text-xl font-semibold mt-4">제 1 조 (수집하는 개인정보)</h2>
      <p>회사는 서비스 제공을 위해 최소한의 개인정보를 수집하며, 수집되는 정보는 다음과 같습니다.</p>
      <ul className="list-disc pl-6">
        <li>이름, 이메일, 연락처</li>
        <li>서비스 이용 기록, 접속 로그</li>
      </ul>

      <h2 className="text-xl font-semibold mt-4">제 2 조 (개인정보의 이용 목적)</h2>
      <p>수집된 개인정보는 서비스 제공, 고객 지원, 맞춤형 서비스 제공 등의 목적으로 활용됩니다.</p>

      <h2 className="text-xl font-semibold mt-4">제 3 조 (개인정보 보관 및 파기)</h2>
      <p>개인정보는 보관 기간 동안 안전하게 보호되며, 보관 기간 종료 시 안전한 방법으로 삭제됩니다.</p>

      <p className="mt-6 text-gray-600">최종 업데이트: 2025년 3월 6일</p>
    </div>
  );
};

export default Privacy;
