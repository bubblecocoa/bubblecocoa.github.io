---
title: "Hermes의 스킬과 기억을 쌓고 함께 활용하기"
image:
  path: /assets/img/post-covers/hermes-shared-context.png
  alt: "작업 경험을 재사용하고, 공통 맥락을 이어가기"
date: 2026-10-07 10:00:00 +0900
categories: [AI와 개발, AI 에이전트]
tags: [Hermes, 스킬, 장기기억, Discord, 협업]
mermaid: false
description: "스킬과 장기 기억의 유지보수, 공동 사용과 팀의 공통 작업 기반에 대한 경험과 구상"
---

[앞선 글](/posts/hermes-from-terminal-to-discord/)에서는 파일과 터미널을 직접 살피다가 Discord로 작업 결과를 받게 된 경험을 정리했습니다. Hermes를 계속 쓰는 이유에는 보고를 받는 장소 외에, 작업하며 알게 된 내용을 다음에도 활용할 수 있다는 점이 있습니다.

이번에는 스킬과 장기 기억의 유지보수, 같은 에이전트를 여러 사람이 함께 쓰는 경우를 다룹니다. 현재 함께 사용하는 경험과 회사에서 겪었던 문제를 바탕으로, 작은 팀에서 공통 작업 기반을 활용하는 방식도 생각해보았습니다.

## 작업하면서 스킬과 기억도 고쳐 나갑니다

Hermes에서 편하게 느끼는 부분은 스킬과 장기 기억을 에이전트가 직접 관리할 수 있다는 점입니다. 정보를 한 번 저장해두는 데서 끝나지 않고, 작업하며 배운 내용을 추가하거나 기존 내용을 고쳐 다음 작업에 활용할 수 있습니다.[^skills][^memory]

스킬은 반복할 작업의 방법을 담은 문서입니다. 어떤 순서로 진행해야 하는지, 어떤 도구를 써야 하는지, 어디에서 문제가 생길 수 있는지 같은 절차를 남깁니다. 예를 들어 이미지 변환 작업에서 특정 옵션이 문제를 일으켰다면, 확인한 해결 방법을 스킬에 보완해 다음 작업에서 참고하게 할 수 있습니다. 에이전트는 스킬을 새로 만들거나 수정·삭제할 수 있고, 필요한 작업에서 해당 스킬을 불러옵니다.[^skills]

스킬을 활용하는 것 자체는 Hermes만의 기능이 아닙니다. 다른 LLM 기반 도구에서도 지원하는 형식에 맞춰 사용자가 스킬을 직접 만들고 활용할 수 있습니다. 다만 준비된 스킬을 불러오는 것과, 작업 중 배운 절차를 자동으로 스킬로 남기고 이후에 수정·정리하는 것은 별개의 기능입니다. 제게는 스킬을 쓸 수 있다는 점뿐 아니라, 매번 제가 작성과 유지보수를 맡지 않아도 에이전트가 그 과정을 이어갈 수 있다는 점이 중요했습니다.[^skills][^curator]


장기 기억은 사용자에 대한 정보와 환경, 계속 지켜야 할 기준처럼 다음 대화에도 필요한 내용을 담습니다. 에이전트는 새 정보를 추가하고, 바뀐 사실은 수정하고, 더 이상 유효하지 않은 내용은 삭제할 수 있습니다. 저장된 기억은 새 세션이 시작할 때 다시 읽습니다. 대화 전체를 무제한으로 쌓는 대신, 제한된 공간에 오래 쓸 내용을 추려두는 방식입니다.[^memory]

이 두 가지가 함께 작동하면 사용자가 매번 같은 요구사항을 설명하거나, 작업 방법을 문서로 정리해 다시 전달하는 부담이 줄어듭니다. 제가 스킬 파일과 기억을 일일이 열어 관리하지 않아도, 에이전트가 작업 중 확인한 절차와 정정을 다음 작업에 반영할 수 있습니다. 덕분에 별도로 신경 쓰지 않아도 점점 제 방식에 맞게 일을 처리하고, 성능이 개선되는 것 같은 효과를 느낍니다.

모델 자체를 다시 훈련하는 것은 아닙니다. 같은 실수를 피할 방법과 필요한 맥락을 더 잘 제공해, 에이전트의 작업 방식이 나아지는 쪽입니다. 실제로 얼마나 좋아졌는지 측정한 성능 수치는 아니지만, 설명을 반복하고 같은 문제를 다시 해결해야 하는 일이 줄어드는 것은 사용자에게 의미가 있습니다.

![확인한 작업 경험을 스킬과 장기 기억에 정리해 다음 작업에 활용하는 흐름](/assets/img/hermes-discord-experience/skills-reuse.svg)

[그림 크게 보기](/assets/img/hermes-discord-experience/skills-reuse.svg){: target="_blank" rel="noopener noreferrer" } · [Excalidraw 원본](/assets/img/hermes-discord-experience/skills-reuse.excalidraw){: download="skills-reuse.excalidraw" }

관리 범위는 설정에 따라 달라집니다. 저장·수정에 사용자 승인을 요구할 수도 있고, 스킬을 주기적으로 정리하는 Curator도 있습니다. 기본 정리는 오래 쓰지 않은 관리 대상 스킬을 분류·보관하는 방식이며, LLM이 내용을 재검토해 겹치는 스킬을 통합하는 기능은 별도로 켜야 합니다.[^skills][^memory][^curator] 모든 문서가 자동으로 정확해지는 것은 아니므로, 중요한 기준이나 잘못 저장된 내용은 확인하고 정정해야 합니다.

## 하나의 에이전트를 함께 쓰는 경우

저는 채널에서 다른 사람과 에이전트를 함께 사용하고 있습니다. 각자의 대화는 나뉘어 있지만, 같은 Hermes 프로필에 저장한 기억과 스킬은 함께 활용합니다. 저마다 에이전트를 따로 두는 대신, 공통 정보를 알고 있는 에이전트 하나에게 이야기하는 방식입니다.

공유해서 쓰려면 사용 권한을 별도로 부여해야 합니다. Hermes의 요청 허용 범위와 Discord의 채널 접근 권한을 따로 설정하고, 함께 쓸 사람을 허용 사용자나 역할로 명시적으로 지정하는 방식으로 범위를 제한할 수 있습니다.[^discord]

함께 쓰는 일정이나 기준을 공통 기억으로 남겨두면, 각자 대화할 때 같은 내용을 처음부터 다시 설명할 일을 줄일 수 있습니다. 다만 다른 대화에서 갱신한 기억이 진행 중인 모든 세션에 즉시 반영되는 것은 아닙니다. 새 세션에서 갱신된 기억을 읽거나, 필요한 스킬과 공통 자료를 조회해 맥락을 이어가는 방식입니다.[^skills][^memory] 실시간 동기화는 아니지만, 저장한 내용까지 버리고 매번 처음부터 다시 설명해야 하는 것은 아닙니다.

제가 생각하는 활용 범위는 서로를 알고 신뢰하는 사람들 사이의 공동 사용이나 작은 팀입니다. 사용자마다 자료 접근 권한을 엄격하게 분리하는 구성을 전제로 한 것은 아닙니다. 대화가 나뉘어도 공통 기억과 작업 파일까지 격리되는 것은 아니므로, 함께 기억할 내용과 따로 관리할 내용을 구분해야 합니다. 작은 팀이라도 민감한 자료가 있으면 별도의 접근 통제가 필요합니다.

## 역할과 기억을 따로 관리하고 싶을 때

특정 주제를 더 독립적으로 다루고 싶다면 프로필을 분리할 수도 있습니다. 기본 프로필은 `default`입니다. 별도의 이름을 붙인 프로필에서는 설정, 기억, 세션과 스킬을 따로 관리하고, 게이트웨이를 별도로 실행해 다른 Discord·Telegram 봇 계정을 연결할 수 있습니다.[^profiles] 대화만 나누고 싶으면 채널과 스레드를, 역할과 기억까지 나누고 싶으면 별도 프로필을 활용하는 방식입니다.

프로필 분리는 상태를 나누는 기능이지 파일 접근 권한을 격리하는 보안 장치는 아닙니다. 같은 OS 사용자 권한으로 실행하면 다른 프로필의 경로에도 접근할 수 있습니다.[^profiles]

## 팀에서도 같은 작업 기반을 공유한다면

같은 프로젝트를 다루는 작은 팀이라면, 공통 자료를 알고 있는 에이전트에게 각자 요청하는 방식도 활용할 만하다고 생각합니다.

회사에서는 리눅스 SSH 서버에서 사용자별 홈 디렉터리를 두고, 각자 Claude CLI를 설치해 코드 작업을 했습니다. 같은 프로젝트를 다루더라도 각자의 저장소에서는 커밋과 브랜치 상태가 달랐습니다. 에이전트가 충돌을 해결해주더라도 변경사항을 합치고, push와 pull로 서로의 작업을 가져오는 과정은 필요했습니다.

코드뿐 아니라 회의록과 작업 진행 상황도 각자의 에이전트에 전달했습니다. 비슷한 자료를 가지고 시작해도 이후에 접한 정보와 작업 시점이 달라, 각자의 에이전트가 알고 있는 맥락에는 차이가 생겼습니다.

이 경우 공통 서버의 저장소와 지식베이스를 작업 기반으로 두고, 요청자나 작업별로 Git worktree를 나누는 방식도 생각해볼 수 있습니다. worktree는 같은 저장소의 커밋과 브랜치 정보를 공유하면서 작업 디렉터리와 체크아웃 상태를 따로 둘 수 있습니다.[^worktree] 한 작업의 결과를 다른 사람이 보기 위해 원격 저장소를 거쳐 다시 pull하는 단계를 줄일 수 있는 구조입니다.

물론 worktree를 나눈다고 다른 브랜치의 변경사항이 자동으로 합쳐지는 것은 아닙니다. 결과를 통합할 때의 merge와 검증은 여전히 필요합니다. 팀 내부의 작업 공유를 로컬에서 하고, 원격 저장소에는 백업이나 CI/CD 실행을 위해 push하는 식으로 역할을 나눌 수 있다는 뜻입니다.

커밋에는 요청자에 맞는 작성자·커미터 정보를 작업 단위로 적용하고, 누가 어떤 작업을 요청했는지도 기록해두면 됩니다. 공용 Git 설정을 여러 작업이 번갈아 바꾸는 방식은 피해야 합니다. 기본적으로 저장소 설정도 worktree 사이에서 공유되기 때문입니다.[^worktree]


![공통 에이전트와 저장소·지식베이스를 활용하되 작업별 worktree를 나누는 구상](/assets/img/hermes-discord-experience/shared-worktrees.svg)

[그림 크게 보기](/assets/img/hermes-discord-experience/shared-worktrees.svg){: target="_blank" rel="noopener noreferrer" } · [Excalidraw 원본](/assets/img/hermes-discord-experience/shared-worktrees.excalidraw){: download="shared-worktrees.excalidraw" }

회의록, 결정 사항, 작업 진행 상황을 공통 경로에 정리해두면, 내가 직접 한 일이 아니어도 에이전트가 그 자료를 확인해 설명할 수 있습니다. 팀원이 어디까지 작업했는지 전달받는 데도 같은 지식베이스를 활용할 수 있습니다. 다만 기록이 갱신돼 있어야 하고, 에이전트가 필요한 자료를 실제로 읽어야 합니다. 모든 대화가 자동으로 팀 지식이 되는 것은 아닙니다.

이렇게 하면 각자의 에이전트에 같은 배경을 반복해서 설명하는 일을 줄일 수 있습니다. 여기서도 모델을 다시 훈련한다는 의미의 학습은 아닙니다. 공통 자료와 저장한 절차를 재사용하는 것입니다. 중복 설명에 쓰는 토큰을 줄일 여지는 있지만, 공유한 자료를 모델에 입력하는 비용까지 없어지는 것은 아닙니다.

함께 쓰는 에이전트와 LLM 계정의 이용 조건은 별도로 봐야 합니다. 같은 봇을 여러 사람이 이용한다고 반드시 개인 구독 계정도 공유해야 하는 것은 아닙니다. 반대로 공유 PC나 소규모 팀이라는 이유만으로 개인 계정 공유가 허용된다고 볼 수도 없습니다. Anthropic의 소비자 약관은 로그인 정보·자격증명을 공유하거나 계정을 타인에게 제공하는 것을 금지합니다.[^consumer-terms]

구성원이 각자 Claude를 사용하는 경우에는 팀 요금제에서 별도 계정을 두는 방식을 검토할 수 있습니다.[^team-plan] 다만 팀 요금제에 가입했다는 것만으로 한 구성원의 구독 인증을 공용 에이전트에 연결해 모두가 이용하는 방식까지 허용되는 것은 아닙니다.

여러 사람이 요청하는 서버형 에이전트라면, 상업용 계약에 따른 API 사용을 별도로 검토할 수 있습니다. Anthropic의 상업용 약관은 조건에 따라 고객이 최종 사용자에게 제공하는 제품·서비스에 API를 활용하는 경우를 다룹니다.[^commercial-terms] 이는 구성 방식과 계약을 검토할 때 구분해야 할 선택지이지, 앞서 소개한 개인 사용 환경을 특정 구독 공유 방식으로 운영하고 있다는 뜻은 아닙니다.

공통 에이전트를 구성하더라도 실제로 사용하는 모델의 계약과 회사의 데이터·접근 권한 정책을 먼저 확인해야 합니다. 제 판단과 책임으로 운영한다는 것만으로 약관상 허용 여부가 바뀌는 것은 아닙니다.

## 함께 쓸수록 관리 기준도 중요해집니다

스킬과 기억을 쌓으면 같은 설명과 문제 해결을 반복하는 부담을 줄일 수 있습니다. 함께 쓰는 경우에는 다른 사람이 진행한 작업의 맥락도 공통 자료에서 확인할 수 있습니다. 다만 무엇을 공유하고 누가 접근할 수 있는지, 기록을 어떻게 갱신할지는 정해두어야 합니다.

제게 중요한 것은 모델 자체가 다시 학습되는 것보다, 작업하며 익힌 절차와 맥락을 이어서 활용할 수 있다는 점입니다. 기록이 잘 관리될수록 에이전트에 설명해야 할 일이 줄고, 다음 작업을 이어가기 편해집니다.

---

## 이어서 읽기

- [AI 작업을 Discord로 보고받게 된 이유](/posts/hermes-from-terminal-to-discord/)
- **Hermes의 스킬과 기억을 쌓고 함께 활용하기 — 현재 글**
- [Hermes 설치와 Discord 연결](/posts/hermes-setup-and-discord/)

## 참고 자료

[^discord]: [Hermes: Discord](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord){: target="_blank" rel="noopener noreferrer" }
[^skills]: [Hermes: Skills System](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills){: target="_blank" rel="noopener noreferrer" }
[^memory]: [Hermes: Persistent Memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory){: target="_blank" rel="noopener noreferrer" }
[^profiles]: [Hermes: Profiles](https://hermes-agent.nousresearch.com/docs/user-guide/profiles){: target="_blank" rel="noopener noreferrer" }
[^consumer-terms]: [Anthropic: Consumer Terms](https://www.anthropic.com/legal/consumer-terms){: target="_blank" rel="noopener noreferrer" }
[^commercial-terms]: [Anthropic: Commercial Terms](https://www.anthropic.com/legal/commercial-terms){: target="_blank" rel="noopener noreferrer" }
[^worktree]: [Git: git-worktree](https://git-scm.com/docs/git-worktree){: target="_blank" rel="noopener noreferrer" }
[^curator]: [Hermes: Curator](https://hermes-agent.nousresearch.com/docs/user-guide/features/curator){: target="_blank" rel="noopener noreferrer" }
[^team-plan]: [Claude: Team plan](https://support.claude.com/en/articles/9266767-what-is-the-team-plan){: target="_blank" rel="noopener noreferrer" }
