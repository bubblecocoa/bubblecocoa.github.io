---
title: "남는 맥북에서 Hermes Agent 운영하기 (2) — 설치와 Discord 연결"
image:
  path: /assets/img/post-covers/hermes-setup.png
  alt: "설치와 Discord 연결"
date: 2026-10-06 09:10:00 +0900
series: "남는 맥북에서 Hermes Agent 운영하기"
series_order: 2
categories: [AI와 개발, AI 에이전트]
tags: [Hermes, macOS, Discord, ChatGPT, OAuth]
mermaid: false
description: "Hermes 설치부터 GPT 연결, Discord 봇 설정까지"
---

앞선 글에서는 안 쓰던 M1 맥북에 Hermes를 두고 Discord에서 요청을 보내는 구성을 소개했습니다. 이번 글에서는 설치와 모델 연결, Discord 설정을 정리했습니다. 저는 설치 후 맥의 터미널에서 Hermes를 실행하고, 나머지 설정은 대화로 맡겼습니다.

## 설치와 연결 순서

먼저 Hermes를 설치하고 사용할 모델을 연결합니다. 터미널에서 대화할 수 있게 되면 Discord 봇과 Gateway를 연결합니다. Gateway는 Discord의 메시지를 Hermes에 전달하고 응답을 돌려주는 역할을 합니다.

![Hermes 설치, ChatGPT OAuth 인증, Discord 봇 연결, 요청과 응답 확인 순서](/assets/img/hermes-setup/part2.png)

이 구성에서 맥북은 Hermes와 도구를 실행합니다. GPT 모델은 외부 서비스에 요청하는 방식으로 사용하며, 맥북에 GPT를 내려받아 실행하는 것은 아닙니다.

## 1. Hermes를 설치합니다

macOS에서는 터미널에서 설치할 수 있습니다. 공식 문서의 POSIX 소스 설치에는 Git, curl, tar, SHA-256 유틸리티가 필요합니다. 빌드 과정에서 컴파일러 등 개발 도구가 필요할 수도 있습니다.[^installation]

처음 설치하는 환경에서는 다음 공식 명령을 사용합니다.

```bash
curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash
```

원격 설치 스크립트를 바로 실행하는 명령입니다. 실행 전에 내용을 살펴보고 싶다면 위 주소의 스크립트를 먼저 열어 볼 수 있습니다.

설치 스크립트가 소스를 내려받고 uv와 PM으로 필요한 의존성과 도구를 준비합니다. 대화형으로 실행하면 모델과 Gateway 설정까지 이어질 수 있습니다.[^installation]

설치 후에는 새 터미널을 열고 다음 명령으로 확인합니다.

```bash
hermes --version
hermes --help
```

`command not found`가 나오면 셸을 다시 열었는지, 설치된 실행 파일의 디렉터리가 `PATH`에 포함되어 있는지 확인합니다. 공식 POSIX 소스 설치의 기본 실행 경로는 `~/.local/bin/hermes`입니다. 설치 방식에 따라 경로는 달라질 수 있습니다.[^installation]

설정 안내는 `hermes setup`으로 다시 열 수 있습니다. 사용법은 `hermes setup --help`로 확인할 수 있습니다.

## 2. 사용할 모델을 선택합니다

Hermes는 여러 제공자의 모델을 연결해 사용할 수 있습니다. 다음 명령을 실행하면 제공자와 모델을 선택하는 화면이 열립니다.[^providers]

```bash
hermes model
```

선택지에서 이용할 수 있는 제공자를 고르고, 인증을 마친 뒤 모델을 선택합니다. 구독으로 연결하는 모델이나 API로 사용하는 모델 외에, Ollama·LM Studio·vLLM 등으로 직접 서빙하는 로컬 모델도 연결할 수 있습니다. 로컬 모델은 실행 중인 서버의 주소와 모델을 지정하는 방식입니다.[^providers]

저는 ChatGPT를 구독하고 있어서 제 계정에서 사용할 수 있는 최신 GPT를 선택했습니다. 구독 계정으로 연결하려면 제공자 목록에서 `ChatGPT or Codex Subscription`을 고르고, 화면에 나오는 로그인 안내를 따르면 됩니다.[^providers]

새 모델이 나오면 Hermes에 모델을 바꿔 달라고 요청해서, 제 계정에서 사용할 수 있는 모델로 바꿔 쓰고 있습니다.

설정을 마친 뒤에는 다음 명령으로 선택한 제공자와 모델을 확인합니다.

```bash
hermes config get model.provider
hermes config get model.default
```

제 환경의 제공자 이름은 `openai-codex`입니다. 모델을 바꾼 뒤에는 새 대화에서 응답을 확인할 수 있습니다.[^models]

## 3. 터미널의 Hermes에게 나머지 설정을 맡깁니다

설치와 모델 연결을 마친 뒤에는 맥의 터미널에서 Hermes CLI를 실행했습니다.

```bash
hermes
```

Discord 연결과 Gateway 설정은 여기서 Hermes에 맡겼습니다. 원하는 구성을 설명하면 Hermes가 필요한 설정을 찾아 적용하는 방식으로 진행했습니다.

예를 들면 이렇게 요청할 수 있습니다.

> 이 맥북의 Hermes를 Discord에서 사용할 수 있도록 설정해 주세요. 사용 권한을 줄 사람과 사용할 채널을 제한하고, 채널 안에서는 스레드로 대화를 이어가고 싶습니다. 로그인이나 승인이 필요한 단계는 알려 주세요.

아래 4단계부터는 Hermes에 맡긴 설정의 내용과 역할을 정리했습니다. 직접 구성할 때 쓸 수 있는 명령어도 함께 남겼습니다. 계정 로그인이나 봇 초대 승인처럼 직접 확인해야 하는 단계는 Hermes의 안내에 따라 진행합니다.

![스마트폰의 대화창으로 맥북에 요청을 보내는 모습을 표현한 AI 생성 이미지](/assets/img/hermes-setup/part2-editorial.webp)
<p class="image-caption">AI 생성 이미지</p>

<details class="setup-details" markdown="1">
<summary>Discord 연결 세부 설정 보기 · 4~7단계</summary>

## 4. Discord 애플리케이션과 봇을 준비합니다

Discord 연결에는 봇 애플리케이션이 필요합니다. 직접 준비할 경우 [Discord Developer Portal](https://discord.com/developers/applications)에서 `New Application`으로 애플리케이션을 만듭니다. 애플리케이션의 `Bot` 페이지에서 봇 계정과 인증 설정을 확인합니다.[^discord]

개인용 봇이라면 `Public Bot`을 끄고 수동 초대 URL을 사용하는 경로도 있습니다. 공식 문서가 권장하는 `Installation` 탭의 Discord 제공 링크를 사용하려면 `Public Bot`을 켜야 합니다. 어느 경로든 `Require OAuth2 Code Grant`는 꺼 두도록 안내합니다.[^discord]

`Privileged Gateway Intents`에서는 공식 Hermes 문서에 따라 다음 항목을 켜고 저장합니다.

- `Server Members Intent`
- `Message Content Intent`

`Message Content Intent`는 메시지를 읽는 데 필요합니다. `Server Members Intent`는 사용자명이나 역할로 허용 대상을 지정할 때 필요하며, 숫자 사용자 ID만 쓰는 구성과는 조건이 다릅니다.[^discord]

권한과 Intent는 별개입니다. 채널에서 메시지를 보낼 권한이 있어도, 필요한 Intent가 꺼져 있으면 연결이나 메시지 처리가 정상적으로 되지 않을 수 있습니다. 특히 Hermes 문서는 `Message Content Intent`가 꺼지면 Discord가 연결을 거부한다고 안내합니다.[^discord]

`Bot` 페이지에서 토큰을 발급받아 안전하게 보관합니다. 기존 봇의 토큰을 재발급하면 기존 토큰으로 실행하던 연결도 영향을 받으므로, 단순히 설정을 확인하려고 초기화하지는 않습니다.

토큰은 봇 로그인에 쓰이므로 채팅이나 화면 캡처, 블로그 저장소에 노출하지 않습니다.

## 5. 필요한 권한으로 서버에 초대합니다

Discord의 `Installation` 탭을 사용하는 경우 `Guild Install`을 활성화하고, scope에 `bot`과 `applications.commands`를 선택합니다. 봇을 초대하려면 대상 서버에서 `Manage Server` 권한이 필요합니다.[^discord]

텍스트 응답과 파일 전송에 필요한 권한은 다음과 같습니다.

- `View Channels`
- `Send Messages`
- `Embed Links`
- `Attach Files`
- `Read Message History`

이 시리즈처럼 스레드에서 작업을 이어가려면 `Create Public Threads`와 `Send Messages in Threads`도 포함합니다. 처리 상태를 반응 이모지로 표시하려면 `Add Reactions`를 추가합니다.[^discord]

`Administrator` 권한을 주는 대신 필요한 권한만 선택합니다. 음성 기능을 사용하지 않는다면 `Connect`와 `Speak`는 이번 텍스트 연결에 필요하지 않습니다. Gateway 설정 마법사가 출력하는 초대 링크에는 음성 권한도 포함될 수 있으므로 승인 화면을 확인합니다.[^discord]

초대 후 서버 구성원 목록에 봇이 보여도, Gateway를 실행하기 전에는 오프라인으로 보일 수 있습니다. 채널과 카테고리의 권한 덮어쓰기도 확인해, 봇이 사용할 테스트 채널만 볼 수 있도록 범위를 줄입니다.

## 6. Gateway에 연결하고 사용할 사람을 제한합니다

직접 Gateway를 설정하려면 다음 명령으로 설정 안내를 엽니다.

```bash
hermes gateway setup
```

`Discord`를 선택하고 토큰을 입력합니다. 문서에 따르면 마법사는 Discord에 토큰을 확인하고, 필요한 Intent를 점검하며, 서버 초대 링크와 봇 소유자의 허용 목록 등록을 안내합니다.[^discord]

처음에는 본인만 허용합니다. 허용 사용자 정보는 `DISCORD_ALLOWED_USERS`로 관리할 수 있으며, Discord 사용자 ID를 쓰면 표시 이름이나 서버 닉네임과 혼동하지 않습니다. 직접 ID를 확인하려면 Discord의 `Settings → Advanced → Developer Mode`를 켜고 본인 프로필에서 `Copy User ID`를 선택합니다.[^discord]

여러 사람이 함께 있는 채널에서도 사용 권한을 준 사람만 요청할 수 있도록 해야 합니다. 사용자 허용 목록과 Discord 채널 권한을 함께 제한하고, 전체 허용 옵션이나 역할·채널 단위 허용 때문에 다른 사람의 요청까지 받아들이지 않는지 확인합니다. 역할 허용 목록(`DISCORD_ALLOWED_ROLES`)을 설정하면 사용자 목록에 없어도 허용된 역할을 가진 사람이 요청할 수 있습니다.[^discord]

다른 사람에게 사용 권한을 주면 제 맥북에서 작업을 요청할 수 있게 됩니다. 활성화된 파일·터미널 도구나 computer use를 통해 제 파일과 로그인된 앱의 정보를 조회할 수도 있습니다. 접근 범위는 Hermes를 실행하는 계정의 권한, 활성화한 도구와 승인 설정에 따라 달라집니다. 사용자 허용 목록이 사람마다 파일이나 앱을 따로 분리해 주지는 않으므로, 누구에게 권한을 줄지는 신중하게 정해야 합니다.

설정은 다음 파일과 항목에 나뉘어 저장됩니다.

| 파일 또는 항목 | 역할 |
| --- | --- |
| `.env`의 `DISCORD_BOT_TOKEN` | 봇 로그인에 필요한 비밀정보 |
| `.env`의 `DISCORD_ALLOWED_USERS` | 요청을 허용할 사용자 목록 |
| `config.yaml`의 `discord` 항목 | 채널 범위, 멘션, 스레드 등 동작 설정 |
| `auth.json` | 모델 제공자의 OAuth 인증 정보 |

기본 저장 위치는 `~/.hermes`입니다. 토큰과 인증 정보가 들어 있는 `.env`와 `auth.json`은 공유하거나 저장소에 올리지 않습니다.

요청이 거부된다고 `DISCORD_ALLOW_ALL_USERS`나 `GATEWAY_ALLOW_ALL_USERS`를 켜기보다는, 허용 목록에 사용자 ID가 제대로 등록되어 있는지 먼저 확인합니다.[^discord]

### 채널 범위도 별도로 좁힙니다

허용 사용자와 봇이 응답할 채널은 서로 다른 설정입니다. 채널 ID도 Developer Mode에서 복사할 수 있습니다. 구조화된 설정은 직접 YAML을 편집하는 대신 `hermes config set`으로 변경할 수 있습니다.[^models][^discord]

다음은 채널 설정 예시입니다. `YOUR_CHANNEL_ID`는 사용할 채널의 ID로 바꿉니다.

```bash
hermes config set discord.allowed_channels '["YOUR_CHANNEL_ID"]'
hermes config set discord.require_mention true
hermes config set discord.auto_thread true
```

`discord.allowed_channels`는 서버 채널 범위를 제한하지만, 허용된 DM까지 차단하는 설정은 아닙니다. 또한 채널 범위만으로 접근을 허용하는 경로도 있으므로, 개인용 구성에서는 본인 사용자 허용 목록을 함께 유지하고 Discord 채널 권한도 제한합니다.[^discord]

`DISCORD_ALLOWED_CHANNELS`처럼 같은 기능의 환경변수가 이미 설정되어 있으면 `config.yaml`보다 우선합니다. 파일의 값만 바꿨는데 반영되지 않는다면, 같은 항목의 환경변수 설정이 있는지도 확인합니다.[^discord]

## 7. 채널과 스레드에서 응답을 확인합니다

Gateway를 서비스로 실행하고 있지 않다면 다음 명령으로 터미널에서 실행할 수 있습니다.

```bash
hermes gateway run
```

Gateway는 터미널에서 계속 실행되며 `Ctrl+C`로 종료할 수 있습니다. 같은 프로필의 Gateway가 이미 서비스로 실행 중이라면 추가로 띄우지 않습니다. 중복 실행하면 공유 상태가 손상될 수 있습니다.

연결 상태는 Discord에서 요청을 보내 확인할 수 있습니다. 응답뿐 아니라 스레드 동작과 접근 제한도 함께 살펴봅니다.

- 본인 계정으로 허용한 채널에서 봇을 `@멘션`했을 때 응답하는지 확인합니다.
- 자동 스레드를 사용한다면 스레드가 만들어지고, 그 안에 응답이 도착하는지 확인합니다.
- 같은 스레드에서 후속 요청을 보내 이전 대화가 이어지는지 확인합니다.
- 다른 스레드에서는 별도 작업을 시작하고, 이전 스레드의 대화가 섞이지 않는지 확인합니다.
- 허용 목록 밖의 사용자와 허용하지 않은 채널에서는 작업을 처리하지 않는지 확인합니다.

기본적으로 일반 서버 채널에서는 봇을 멘션해야 합니다. 자동으로 만들거나 봇이 한 번 참여한 스레드에서는 이후 메시지에 멘션을 생략할 수 있습니다. 여러 봇이 같은 스레드를 쓴다면 `discord.thread_require_mention: true`로 설정해 스레드에서도 매번 멘션하도록 할 수 있습니다.[^discord]

스레드를 나누면 대화 기록은 분리되지만, 맥북의 파일 접근 권한이나 실행 환경까지 분리되지는 않습니다. 외부 모델을 쓸 때는 대화와 도구로 읽은 자료가 모델 서비스로 전달될 수 있으니, 처음에는 민감하지 않은 내용으로 테스트합니다.

## 응답이 없을 때 확인할 항목

| 증상 | 먼저 확인할 내용 |
| --- | --- |
| 터미널 질의부터 실패합니다 | 주요 모델 제공자, OAuth 인증, 계정 권한과 한도를 확인합니다. |
| 봇이 계속 오프라인입니다 | Gateway 실행 여부, 토큰, 필요한 Intent를 확인합니다. |
| 온라인인데 채널에서 응답하지 않습니다 | 사용자 허용 목록, 채널 범위, 멘션, 채널 권한을 확인합니다. |
| 일반 채널은 되는데 스레드는 실패합니다 | 스레드 전송 권한과 스레드 접근 범위를 확인합니다. |
| 설정 변경이 반영되지 않습니다 | 같은 기능의 환경변수 우선 적용 여부와 새 세션 여부를 확인합니다. |

오류를 물어보려고 로그를 공유할 때는 토큰, 사용자·채널 ID, 개인 대화와 로컬 경로가 들어 있는지 먼저 살펴보고 필요한 부분만 공유합니다.

</details>

Discord에서 응답을 받으면 맥북 앞에 앉지 않고도 Hermes에 작업을 요청할 수 있습니다. 이것으로 설치와 Discord 연결 과정은 마칩니다. 맥북을 계속 켜 두고 사용하기 위한 서비스와 전원 설정은 부록에 정리했습니다.

## 이 시리즈의 다른 글

- [1편 · 전체 구성과 선택 이유](/posts/hermes-on-an-unused-m1-macbook/)
- **2편 · 설치와 Discord 연결 — 현재 글**
- [부록 · 맥북을 켜 두고 사용할 때](/posts/hermes-gateway-macos-operation/)

## 참고 자료

공식 문서는 2026년 10월 6일에 확인했습니다. 설치와 설정 화면이 달라지면 현재 설치된 버전의 `--help`와 아래 문서를 함께 참고할 수 있습니다.

[^installation]: [Hermes Agent — Installation](https://hermes-agent.nousresearch.com/docs/getting-started/installation){: target="_blank" rel="noopener noreferrer" }
[^providers]: [Hermes Agent — LLM and Model Providers](https://hermes-agent.nousresearch.com/docs/integrations/providers){: target="_blank" rel="noopener noreferrer" }
[^models]: [Hermes Agent — Configuring Models](https://hermes-agent.nousresearch.com/docs/user-guide/configuring-models){: target="_blank" rel="noopener noreferrer" }
[^discord]: [Hermes Agent — Discord](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord){: target="_blank" rel="noopener noreferrer" }
