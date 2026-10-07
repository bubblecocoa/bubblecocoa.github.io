---
title: "남는 맥북에서 Hermes Agent 운영하기 (부록) — 맥북을 켜 두고 사용할 때"
date: 2026-10-06 09:20:00 +0900
categories: [AI와 개발, AI 에이전트]
tags: [Hermes, macOS, Discord, launchd]
description: "맥북으로 Hermes를 운영하며 따로 챙긴 서비스와 전원 설정"
---

설치와 Discord 연결은 앞의 두 편에서 다뤘습니다. 이 부록에는 제가 맥북을 계속 켜 두고 사용하면서 따로 챙긴 설정을 모았습니다.

Hermes를 꼭 맥북에서 쓸 필요는 없습니다. 다른 운영체제에서 실행할 수도 있고, 같은 macOS라도 Mac mini나 Mac Studio처럼 배터리와 덮개가 없는 장비를 사용할 수도 있습니다. 아래의 전원·배터리·덮개 이야기는 제 맥북 환경에 해당합니다.

서비스 등록은 터미널에서 실행한 Hermes에 맡겼습니다. 제가 직접 살펴본 부분은 화면을 끄면서도 본체는 잠들지 않게 하는 전원 설정이었습니다. 같은 방식으로 맥북을 활용한다면 참고할 만한 내용입니다.

## 서비스 등록도 Hermes에 맡겼습니다

맥북이 다시 켜진 뒤에도 Discord에서 작업을 이어갈 수 있도록 Gateway를 서비스로 등록해 달라고 요청했습니다. 서비스 명령이나 설정 파일을 제가 하나씩 찾아 수정한 것은 아닙니다.

Hermes Gateway는 Discord의 요청을 받아 처리하는 프로그램입니다. macOS에서는 launchd가 이 프로그램의 실행을 관리하도록 등록할 수 있습니다. 등록해 두면 사용자 로그인 후 Gateway가 실행되므로, 매번 터미널에서 직접 켤 필요가 없습니다.[^gateway][^launchd]

![Hermes Gateway의 launchd 실행과 로그인·전원 조건을 정리한 운영 구성](/assets/img/hermes-setup/part3.png)

다만 서비스 등록이 로그인까지 대신해 주지는 않습니다. 사용자 계정의 LaunchAgent로 실행하는 구성이라 재부팅 뒤에는 로그인이 필요하고, FileVault가 켜져 있으면 잠금 해제도 거쳐야 합니다.[^launchd][^filevault] 재부팅 후 복구 과정을 직접 시험한 기록은 아니며, 서비스 등록 방식에서 알아둘 조건입니다.

등록된 Gateway의 상태를 살펴보고 싶을 때는 다음 명령을 사용할 수 있습니다.[^cli]

```bash
hermes gateway status
```

## 화면은 꺼져도 맥북은 깨어 있도록

화면이 꺼지는 것과 맥북이 잠자기에 들어가는 것은 다릅니다. 화면은 꺼져 있어도 작업을 계속할 수 있지만, 본체가 잠들면 Discord로 보낸 요청을 바로 처리할 수 없습니다.

그래서 전원 어댑터를 연결한 상태에서는 본체가 자동으로 잠들지 않고, 화면만 1분 뒤 꺼지도록 설정했습니다. 맥북을 계속 켜 두더라도 화면까지 켜 놓을 필요는 없었습니다.

![덮개를 열고 전원을 연결한 맥북의 화면만 꺼 둔 모습을 표현한 AI 생성 이미지](/assets/img/hermes-setup/part3-editorial.webp)
<p class="image-caption">AI 생성 이미지</p>

macOS에서는 **시스템 설정 → 배터리 → 옵션**에서 전원 어댑터 연결 시 화면이 꺼져도 자동 잠자기를 방지하는 항목을 찾을 수 있습니다. 화면이 꺼지는 시간은 **시스템 설정 → 잠금 화면**에서 조정합니다.[^power]

제 맥북의 전원 설정은 다음과 같습니다.

- **전원 어댑터 연결:** 본체의 유휴 잠자기 없음, 화면은 1분 뒤 꺼짐
- **배터리 사용:** 본체는 1분, 화면은 2분 뒤 잠자기·꺼짐

따라서 전원을 뽑으면 같은 조건으로 운영되지 않습니다. 계속 요청을 받을 용도로 쓸 때는 전원 연결 상태도 함께 챙겨야 합니다. 덮개를 닫았을 때의 동작은 별도로 확인해야 하므로, 화면만 끄는 설정과 같은 것으로 보지는 않았습니다.

## 연결이 끊기면 맥북 상태부터 살펴봅니다

서비스를 등록해도 전원이나 네트워크가 끊기는 문제까지 해결되지는 않습니다. Discord에서 응답이 없으면 맥북이 켜져 있는지, 잠자기에 들어가지는 않았는지, 네트워크가 연결돼 있는지부터 확인합니다. 재부팅한 뒤라면 사용자 로그인 여부도 살펴봅니다.

세부 설정은 Hermes에 맡기고, 제가 계속 사용하는 조건에 집중했습니다. 화면은 꺼 두되 맥북은 요청을 받을 수 있도록 깨어 있게 두는 것입니다.

## 이 시리즈의 다른 글

- [1편 · 전체 구성과 선택 이유](/posts/hermes-on-an-unused-m1-macbook/)
- [2편 · 설치와 Discord 연결](/posts/hermes-setup-and-discord/)
- **부록 · 맥북을 켜 두고 사용할 때 — 현재 글**

## 참고 자료

[^gateway]: [Hermes Agent — Messaging Gateway](https://hermes-agent.nousresearch.com/docs/user-guide/messaging){: target="_blank" rel="noopener noreferrer" }
[^cli]: [Hermes Agent — CLI Commands](https://hermes-agent.nousresearch.com/docs/reference/cli-commands){: target="_blank" rel="noopener noreferrer" }
[^launchd]: [Apple — Creating Launch Daemons and Agents](https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html){: target="_blank" rel="noopener noreferrer" }
[^filevault]: [Apple — Automatically log in to your Mac](https://support.apple.com/en-us/102316){: target="_blank" rel="noopener noreferrer" }
[^power]: [Apple — Set sleep and wake settings](https://support.apple.com/guide/mac-help/set-sleep-and-wake-settings-mchle41a6ccd/mac){: target="_blank" rel="noopener noreferrer" }
