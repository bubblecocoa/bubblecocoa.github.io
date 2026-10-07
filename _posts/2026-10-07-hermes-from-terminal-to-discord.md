---
title: "AI 작업을 Discord로 보고받게 된 이유"
date: 2026-10-07 09:50:00 +0900
categories: [AI와 개발, AI 에이전트]
tags: [Hermes, Discord, CLI, VS Code, cmux]
mermaid: false
description: "VS Code와 cmux로 AI 작업을 살피다가 Hermes와 Discord 중심으로 옮겨간 이유"
---

앞선 글에서는 남는 맥북에 Hermes를 설치하고 Discord로 연결하는 방법을 정리했습니다. 그렇게 만든 환경을 계속 쓰는 이유는, 지금 제가 작업을 확인하는 방식과 잘 맞기 때문입니다.

처음에는 VS Code와 cmux를 열어 파일과 터미널을 직접 살폈습니다. 그런데 어느 순간부터 코드를 직접 관리하거나 변경사항을 하나씩 확인하는 일이 없어졌습니다. AI에게 작업을 맡기고 Discord로 결과를 받는 편이 편해졌습니다.


## VS Code와 cmux에서 확인하던 것들

VS Code에서는 코드뿐 아니라 Markdown 문서와 Mermaid 구성도를 읽었습니다. 변경사항을 살펴보고, 이미지 리소스를 열고, 수정한 파일이 화면에 어떻게 반영되는지도 확인했습니다. 터미널을 쓰거나 SFTP로 파일을 옮기는 일도 이 환경에서 함께 처리했습니다.

다만 제가 사용한 Remote-SSH 방식에서는 원격 환경에 VS Code Server가 설치됩니다.[^remote-ssh] 접속해서 작업 화면이 뜨기까지 약간의 시간이 걸렸고, 파일이나 터미널만 잠깐 확인하려고 열 때는 무겁게 느껴졌습니다.

cmux는 여러 터미널을 동시에 볼 수 있어서 사용했습니다. 작업마다 터미널을 나눠두고 어떤 일이 진행 중인지 확인하기 좋았습니다. VS Code는 파일을 보기 위해, cmux는 터미널들을 함께 보기 위해 열었습니다.

orca ade도 접해봤습니다. 제게는 VS Code와 cmux 사이에 있는 도구처럼 느껴졌지만, 거의 사용하지 않아 자세히 비교하기는 어렵습니다.

## 코드보다 보고를 읽는 시간이 늘었습니다

작업의 두뇌로 활용하는 프론티어 모델들의 결과물이 나쁘지 않았습니다. 직접 코드를 관리하거나 변경사항을 하나씩 확인하지 않게 되면서, 뷰어나 터미널을 열어두는 일도 줄었습니다.

보고는 Markdown 파일보다 Discord에서 읽는 편이 편했습니다. 파일을 찾아 열지 않아도 되고, 읽다가 수정할 내용이 있으면 그 자리에서 이야기할 수 있습니다. 요청과 답변이 같은 대화에 남는 것도 좋았습니다.

CLI를 직접 쓸 때는 작업 세션에 들어가 진행 상황을 살폈습니다. 지금은 Discord에서 요청하고, Hermes가 도구를 사용해 작업한 결과를 받습니다. 모델의 답변 품질도 중요하지만, 제게는 결과를 어디에서 받느냐도 중요했습니다.


## 파일도 대부분 Discord에서 받으면 충분했습니다

큰 파일은 SFTP로 옮겨야 할 때가 있습니다. 그럴 때는 별도로 접속하고 전송해야 해서 귀찮습니다. 하지만 제가 주로 확인하는 HTML, XML, Markdown 파일과 각종 이미지는 Discord로 전달받는 것으로 충분했습니다. 도표, 생성형 이미지, 화면 캡처를 대화에서 보고, 필요한 파일은 첨부파일로 받으면 됐습니다.

외부 서비스로 보내는 내용은 신경 써야 합니다. Discord에 올린 메시지와 파일은 Discord가 처리하는 데이터에 포함됩니다.[^discord-privacy] 또 외부 LLM을 쓰는 구성에서는 모델에 입력하는 내용이 해당 제공사로 전달됩니다. 첨부파일 전부가 자동으로 LLM에 전달된다는 뜻은 아니며, 실제로 보내는 내용은 도구와 입력 방식에 따라 달라집니다. 보관 여부와 기간도 서비스와 설정에 따라 다릅니다.

맥북에서 Hermes를 실행한다고 대화와 파일이 맥북 안에만 남는 것은 아닙니다. 민감한 데이터나 파일을 어디까지 전달할지 판단하는 책임은 자신에게 있습니다.

## 직접 만든 봇에는 구현할 일이 더 남아 있었습니다

Discord나 Telegram에 AI를 연결하는 봇을 직접 만들어 사용한 적도 있습니다. 당시에는 AI CLI의 터미널을 유지하는 안정성이 아쉬웠습니다. 메신저를 연결한 뒤에도 그 뒤에서 돌아가는 터미널을 신경 써야 했습니다.

제가 만든 구성은 단일 터미널을 활용했기 때문에 한 번에 하나의 작업만 처리할 수 있었습니다. 작업 절차를 스킬로 남기거나, 장기 기억을 관리하고 갱신하는 기능도 없었습니다.

여러 작업을 진행하고 경험을 다음 작업에 활용하려면 그런 기능을 따로 구현해야 했습니다. 에이전트를 여러 개 띄우고 여러 봇이 서로 호출하게 만드는 방식까지 고려하면, 관리해야 할 것도 늘어납니다. 단순히 메신저와 CLI를 연결하는 것만으로 끝나지 않았습니다.

제게는 이 부분을 처음부터 직접 만들지 않아도 된다는 점이 컸습니다. 터미널과 세션을 관리하는 부담도 덜 느꼈습니다. 다만 이것은 제 사용 경험이지, Hermes에서 세션 문제가 전혀 발생하지 않는다는 보장은 아닙니다.

## 기다리는 대신 다른 스레드에서 요청하기

제가 쓰는 Telegram이나 Discord의 1:1 대화에서는 한 대화 안의 작업을 하나씩 처리하는 흐름이 기본입니다. 같은 대화에 새 메시지를 보내는 것은 진행 중인 작업에 지시를 보태거나 다음 요청을 이어가는 것에 가깝습니다.

Discord에서는 다른 채널이나 새 스레드에서 요청할 수 있습니다. Hermes가 이 대화들을 별도 세션으로 다루기 때문에, 봇 계정 하나로 여러 대화에서 작업을 진행할 수 있습니다.[^discord] 새로운 주제를 이야기하려고 기존 작업이 끝나기를 기다릴 필요가 없습니다. 물론 실제 진행 속도와 동시 실행 범위는 시스템 자원과 모델 제공사의 이용 한도 등에 영향을 받습니다.

주제별로 스레드가 나뉘어 있으니 지난 대화를 검색하거나 다시 읽기도 편했습니다. 여러 주제의 이야기가 한 대화에 섞이지 않아, 어떤 요청을 했고 어떻게 진행됐는지 맥락을 짚어보기 좋았습니다.


각 스레드에서 대화 이력을 따로 다루는 것이지, 기억과 작업 파일까지 모두 분리되는 것은 아닙니다.[^discord][^memory] 같은 파일을 동시에 수정하는 작업은 조율해야 합니다.

## 지금은 이 방식이 편합니다

지금은 작업을 맡기고 여러 대화에서 결과와 파일을 받는 편이 편합니다. 직접 만든 봇에서 느꼈던 터미널 유지와 기능 구현의 부담을 덜 수 있다는 점도 Hermes를 계속 쓰는 이유입니다.

직접 코드를 보며 디버깅하거나 CLI 화면을 자세히 확인할 일이 생기면 IDE와 터미널을 다시 열면 됩니다. 현재는 그보다 요청하고 보고를 읽는 일이 많아서, Discord를 주로 보고 있습니다.

Hermes가 작업 절차와 기억을 관리해 다음 작업에 활용할 수 있다는 점도 계속 사용하는 이유입니다.[^skills][^memory] 이 부분과 하나의 에이전트를 함께 쓰는 방식은 [다음 글](/posts/hermes-skills-and-shared-context/)에서 이어서 다룹니다.

---

## 이어서 읽기

- **AI 작업을 Discord로 보고받게 된 이유 — 현재 글**
- [Hermes의 스킬과 기억을 쌓고 함께 활용하기](/posts/hermes-skills-and-shared-context/)
- [Hermes 설치와 Discord 연결](/posts/hermes-setup-and-discord/)

## 참고 자료

[^discord]: [Hermes: Discord](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord){: target="_blank" rel="noopener noreferrer" }
[^skills]: [Hermes: Skills System](https://hermes-agent.nousresearch.com/docs/user-guide/features/skills){: target="_blank" rel="noopener noreferrer" }
[^memory]: [Hermes: Persistent Memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory){: target="_blank" rel="noopener noreferrer" }
[^remote-ssh]: [VS Code: Remote Development using SSH](https://code.visualstudio.com/docs/remote/ssh){: target="_blank" rel="noopener noreferrer" }
[^discord-privacy]: [Discord Privacy Policy](https://discord.com/privacy){: target="_blank" rel="noopener noreferrer" }
