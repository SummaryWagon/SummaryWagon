# SummaryWagon [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FSummaryWagon%2FSummaryWagon&count_bg=%23576CBC&title_bg=%23555555&icon=bower.svg&icon_color=%23E7E7E7&title=SummaryWagon&edge_flat=false)](https://hits.seeyoufarm.com)

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://highlighters.site/" target="_blank"> -->
    <img src="https://user-images.githubusercontent.com/101175828/236845283-1c4025f1-28c2-454e-a1fb-f9a9fcd43a76.png" alt="Logo" width="" height="">
  <!-- </a> -->

  <p align="center">
   <i>for Speed</i>
  </p>
  <p align="center">
    <b> </b>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

## 목차

1. [프로젝트 개요](#SummaryWagon)
2. [서비스 소개](#Intro)
3. [서비스 구조도](#Arch)

<!-- ABOUT THE PROJECT -->

<a name="SummaryWagon"> </a>

## 프로젝트 개요

프로젝트 기간 : 2023.05.01 ~ 06.15

기술 스택 :

| 분류                      | 기술                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Frontend**              | <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react&logoColor=white">                                                                                                                                                                                                                 |
| **Backend**               | <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Database**              | <img src="https://img.shields.io/badge/MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">                                                                                                                                                                                                                                                                                                                      |
| **AI**                    | <img src="https://img.shields.io/badge/OpenAI%20API-FF9500?style=for-the-badge&logo=openai&logoColor=white">                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Infrastructure/DevOps** | <img src="https://img.shields.io/badge/EC2-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/aws_lambda-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/aws_s3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/Nginx-269539?style=for-the-badge&logo=nginx&logoColor=white"> |
| **Testing/Docs**          | <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"> <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white">                                                                                                                                                                                                                                                                                                                            |

팀원 : 3

| FE                                                                           | BE                                                                                         | BE                                                                               |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| [![프로필1](https://github.com/ChoBae.png?s=200)](https://github.com/ChoBae) | [![프로필2](https://github.com/YoungwooKim09.png?s=200)](https://github.com/YoungwooKim09) | [![프로필3](https://github.com/jamiehun.png?s=200)](https://github.com/jamiehun) |
| [🤠ChoBae](https://github.com/ChoBae)                                        | [🤡Youngwoo](https://github.com/YoungwooKim09)                                             | [🥸Jamie](https://github.com/jamiehun)                                           |

<!-- 웹사이트 : [바로가기](https://highlighters.site/) -->

<!-- - demo 계정 : test@test.com
- demo 계정 비밀번호 : 1234
- 익스텐션을 설치해야 그룹원들의 하이라이팅을 볼 수 있고, 피드를 추가할 수 있으니 아래의 스토어에서 설치 후 이용해주시면 감사하겠습니다. -->

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>

<a name="Intro"> </a>

## 서비스 소개

<h3 align="left">SummaryWagon은 링크를 입력하면 웹사이트 내용을 간결하게 요약해주는 간편한 서비스입니다.</h3>
 
- Chatgpt 3.5 모델을 사용하여 요약을 진행합니다.
- 요약된 내용을 편리하게 볼 수 있도록 웹사이트를 제공합니다.
- 요약된 내용을 다른 사람들과 공유할 수 있습니다.

## 주요 기능

### 1. 웹페이지 요약

- 페이지 링크만으로 웹페이지 내용을 요약할 수 있습니다.
  <div>
    <img width="400" height="200" src="https://github.com/ChoBae/Cloud/assets/101175828/145c5363-8360-4146-a3d5-dcb11296a0c0">
  </div>

### 2. 아티클 아카이빙

- 요약된 웹사이트는 아티클로 저장되고, 공유할 수 있습니다.
   <table border="0" >
    <tr>
        <td><img width="400" height="200" src="https://github.com/SummaryWagon/SummaryWagon/assets/101175828/e97ee1cb-49a0-4710-b386-70762fc12dc7"> </img></td>
        <td><img width="400" height="200" src="https://github.com/SummaryWagon/SummaryWagon/assets/101175828/232173f5-df94-4983-ad6f-09d7db59b3ac"></img></td>
   </tr>
  </table>
- 히스토리는 유저가 가장 최근에 검색한 순으로 보여집니다.
  <img width="500" src="https://github.com/SummaryWagon/SummaryWagon/assets/101175828/c98ebfbd-0cad-4f6f-9465-31c190a31702">

- 트렌드 토픽은 유저들이 가장 많이 요약한 순으로 보여집니다.

  <img width="500" src="https://github.com/SummaryWagon/SummaryWagon/assets/101175828/850408d7-ea0b-498b-a115-1368545a8520">

### 3. 키워드 별 아티클 아카이빙

- 키워드 추출 알고리즘을 통해 키워드를 추출하였고, 키워드별로 아티클을 볼 수 있습니다.
- 키워드는 인기 키워드 순으로 보여집니다.
- 키워드 별 아티클은 유저들이 가장 많이 요약한 순으로 보여집니다. 
  <div>
    <img width="500" src="https://github.com/SummaryWagon/SummaryWagon/assets/101175828/658db5a6-e96a-4fe2-9c05-22840ab83736">
  </div>
## 업데이트 예정

### 1. BM 요소 추가

- Open AI 과금으로 인해 현재 하루 5회 제한이 있습니다. 이를 해결하기 위해 BM 요소를 추가할 예정입니다.
  <img width="500" src="https://github.com/SummaryWagon/SummaryWagon/assets/101175828/65a392e1-b253-4f63-a261-5d24d4e82fcd">

<!-- 아키텍처 -->

<!-- <a name="Arch"></a> -->

## 서비스 구조도

![image](https://github.com/ChoBae/KaBrain/assets/101175828/b63d695b-930f-4af5-bb89-456b2b0561b6)

<p align="right">(<a href="#readme-top">맨 위로</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/SY-Highlighters/Highlighters/issues
[product-screenshot]: images/screenshot.png
[next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[next-url]: https://nextjs.org/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
[vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[vue-url]: https://vuejs.org/
[angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[angular-url]: https://angular.io/
[svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[svelte-url]: https://svelte.dev/
[laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[laravel-url]: https://laravel.com
[bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[bootstrap-url]: https://getbootstrap.com
[jquery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[jquery-url]: https://jquery.com
