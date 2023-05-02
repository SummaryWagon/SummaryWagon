export default async function Login() {

  return (
    <div>
      <h4>회원 가입</h4>
      <form action="/api/login/login" method="POST">
        <input type="text" name="id" placeholder="아이디" />
        <input type="text" name="pwd" placeholder="비밀번호" />
        <button type="submit">버튼</button>
      </form>
    </div>
  );
}
