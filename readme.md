# iProxy

## Version History

> 버전 그것은 사치일 뿐

## How To Use
`Windows`의 *Chrome*에서 인벤 도메인 접속시 `Ubuntu`의 로컬 웹 서버로 호스트를 변조하기 위해 사용합니다.
프록시 서버는 각 개인 `Windows`에서 구동됩니다.

**설치전 [Node.js]과 [Git]이 설치되어 있다고 가정합니다.**

 - 프록시 설치방법
    1. [Inven Gitlab]에 저장되어 있는 [iProxy]소스를 내려받습니다.
        `$ git clone http://117.52.90.243/byzz/iproxy.git`
    1. 해당 디렉토리로 이동 후 의존성 모듈을 설치합니다.
        `$ cd iproxy && npm install`
    1. [pm2] 모듈을 글로벌로 설치합니다.
        `$ npm install -g pm2`
    1. `.env` 파일을 열어 `PROXY_USER`와 `MIRROR_HOST`를 적절하게 수정합니다.
        `MIRROR_HOST`는 자신의 `Ubuntu` PC의 IP를 입력합니다.
    1. 마지막으로 실행!
        `$ npm start`
        *참고\) 정상적으로 실행된 프록시 화면입니다.*
        ![npm start](http://static.inven.co.kr/image_2011/test/dev/krapp_md/krapp_npm_start.jpg)
    1. 기타 명령어
        - `$ npm stop` : 모든 프로세스를 종료합니다.
        - `$ pm2 monit` : 로그출력을 확인 할 수 있습니다.
 - *Chrome*으로 프록시 접속 설정방법
    1. [Proxy Switch Omega] 확장 프로그램을 설치합니다.
    1. **+ New Profile...** 클릭, **Profile name**을 입력 **Proxy Profile** 선택 후 저장합니다.
    1. 방금 생성한 **Proxy Profile**을 선택, `Protocol: HTTP, Server: 자신의 Windows IP, Port: 8722` 입력 후 저장합니다.
    1. **+ New Profile...** 클릭, **Profile name**을 입력 **Switch Profile**을 선택 후 저장합니다.
        ![switch omega settings](http://static.inven.co.kr/image_2011/test/dev/krapp_md/krapp_omega_settings2.jpg)
    1. 방금 생성한 **Switch Profile**을 선택, **Host wildcard** 타입으로 인벤 도메인을 입력 그리고 **Profile**에서 위에서 추가한 **Proxy Profile**을 매칭 후 저장합니다.
        ![switch omega settings](http://static.inven.co.kr/image_2011/test/dev/krapp_md/krapp_omega_settings.jpg)
 - 프록시 적용하기
    - *Chrome* 확장 프로그램 표시줄에서 [Proxy Switch Omega]를 클릭하시면 전환이 가능합니다.
        ![switch omega settings](http://static.inven.co.kr/image_2011/test/dev/krapp_md/krapp_omeage_switching.jpg)


[Laravel]: https://laravel.com/
[Node.js]: https://nodejs.org/en/
[Git]: https://git-scm.com/downloads
[Inven Gitlab]: http://117.52.90.243/dashboard/projects
[iProxy]: http://117.52.90.243/byzz/iproxy
[pm2]: https://www.npmjs.com/package/pm2
[Proxy Switch Omega]: https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif