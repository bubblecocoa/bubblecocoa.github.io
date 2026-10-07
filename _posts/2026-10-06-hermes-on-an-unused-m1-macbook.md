---
title: "남는 맥북에서 Hermes Agent 운영하기 (1) — 구성과 선택 이유"
image:
  path: /assets/img/post-covers/hermes-overview.png
  alt: "구성과 선택 이유"
date: 2026-10-06 09:00:00 +0900
categories: [AI와 개발, AI 에이전트]
tags: [Hermes, macOS, Discord, ChatGPT]
mermaid: false
description: "안 쓰던 M1 맥북에 Hermes를 설치하고 Discord로 쓰기"
---

오랫동안 쓰지 않던 M1 맥북이 있었습니다. 이 맥북에 Hermes Agent를 설치하고 Discord 봇을 연결했습니다. 지금은 Discord에 메시지를 보내면 맥북에서 실행 중인 Hermes가 요청을 받아 처리하는 방식으로 쓰고 있습니다.

안 쓰던 맥북을 고른 이유부터 주요 모델과 메신저를 선택한 이유까지 적어보았습니다. 설치와 세부 설정은 다음 글에서 다루겠습니다.

## 사용한 맥북 사양

새 장비를 사는 대신 갖고 있던 MacBook Air를 사용했습니다.

- MacBook Air (`MacBookAir10,1`)
- Apple M1, 8코어 CPU
- 메모리 16GB
- macOS 26.2

GPT 모델은 외부 서비스에서 실행하고, 맥북에서는 Hermes와 작업에 필요한 도구를 실행합니다.

## 맥북에서 실행하고, Discord에서 대화하기

Hermes는 Nous Research에서 만든 오픈소스 AI 에이전트입니다. 모델과 대화하는 것 외에 도구를 이용해 파일이나 명령어를 다루는 작업도 할 수 있습니다.

Discord에 요청을 보내면 맥북에서 실행 중인 Hermes가 받아 처리하고 결과를 돌려줍니다. 맥북 앞에 앉아 터미널에 입력하지 않아도 됩니다.

![Discord와 M1 맥북의 Hermes, 외부 GPT 모델의 연결 구조](/assets/img/hermes-setup/part1.png)
_요청은 Discord에서 보내고, 실제 도구 작업은 맥북에서 실행합니다._

GPT를 맥북에 내려받아 실행하는 구성은 아닙니다. 모델은 외부 서비스에 연결하고, 파일을 수정하거나 명령어를 실행하는 작업은 맥북에서 합니다.

## 주요 모델로 GPT를 선택한 이유

주요 모델을 고를 때는 이미 쓰고 있는 구독을 연결할 수 있는지가 중요했습니다.

Claude를 주요 모델로 선택하지 않은 이유는 Anthropic의 구독 사용 정책 때문입니다. Hermes 공식 문서에 따르면 Claude Max의 OAuth 연결은 추가 사용 크레딧을 소비하며, 기본 구독에 포함된 사용 한도를 쓰지 않습니다. Claude Pro는 해당 OAuth 경로를 지원하지 않습니다. API 키로 연결할 경우에도 구독과 별도로 사용량에 따라 과금됩니다.[^providers][^claude-login]

Claude를 Hermes의 주요 모델로 직접 연결하려면 추가 사용 크레딧이나 별도 API 과금이 필요해, 저는 GPT를 선택했습니다.[^providers]

Hermes에서 Claude Code CLI를 사용하는 skill도 제공합니다. 공식 Claude Code를 tmux 세션이나 `-p` 옵션으로 실행하는 방식입니다.[^claude-code-skill] Claude Code에 구독 계정으로 로그인해서 쓰는 것과 Hermes의 주요 모델로 Claude를 직접 연결하는 것은 별개입니다.[^claude-compliance]

Hermes는 ChatGPT 구독의 OAuth 인증으로 OpenAI Codex 모델을 연결할 수 있습니다.[^providers][^codex-auth] 저도 이 방식으로 연결했습니다. 별도 API 키를 발급받지 않고 구독 계정으로 연결할 수 있다는 점이 선택 이유였습니다.

OpenClaw 공식 문서에서도 OpenAI가 OpenClaw 같은 외부 도구와 워크플로에서 구독 OAuth 사용을 지원한다고 설명합니다.[^openclaw-auth]

OpenClaw 제작자 Peter Steinberger는 OpenAI 합류를 발표하기도 했습니다.[^openclaw-founder]

## 여러 메신저 중 Discord를 선택한 이유

Hermes는 Discord 외에도 여러 메신저와 연결할 수 있습니다. 저는 평소 사용하기 편한 쪽을 기준으로 Discord를 선택했습니다.

이전 대화를 빠르게 찾을 수 있었고, 사용하는 동안 서비스도 안정적으로 느껴졌습니다. PC와 모바일 앱에서 같은 대화를 이어서 확인하기도 편했습니다.

특히 채널 안에서 스레드를 나눌 수 있다는 점이 마음에 들었습니다. 큰 주제는 채널로 구분하고, 특정 작업은 그 안의 스레드에서 이어갈 수 있습니다. 서로 다른 프로젝트나 글쓰기 요청이 한 대화에 섞이지 않게 관리하기 좋습니다.

Discord 봇을 만들고 서버에 연결한 뒤, Hermes Gateway가 그 봇을 통해 메시지를 받고 응답하도록 설정했습니다. 지금 이 기술블로그를 준비하는 대화도 Discord 스레드에서 진행하고 있습니다.

## 재부팅 후에도 Discord에서 이어서 쓰기

Discord에서 요청을 받으려면 Hermes Gateway가 계속 실행되어 있어야 합니다. 재부팅할 때마다 맥북에서 터미널을 열어 다시 켜고 싶지는 않았습니다.

그래서 Gateway를 macOS의 launchd 서비스로 등록해, 재부팅 후 다시 실행되도록 구성했습니다.

사용자 로그인 후 실행되는 LaunchAgent라서 재부팅 뒤에는 로그인이 필요합니다. FileVault가 켜져 있으면 잠금 해제도 필요하고, 맥북이 잠들거나 네트워크가 끊기면 요청을 처리할 수 없습니다.

제 맥북은 화면이 꺼져도 본체와 로그인 세션은 유지하도록 설정했습니다. 화면까지 계속 켜둘 필요는 없지만, 작업을 처리할 맥북은 깨어 있어야 합니다.

![맥북에서 실행되는 작업을 스마트폰으로 요청하는 모습을 표현한 AI 생성 이미지](/assets/img/hermes-setup/part1-editorial.webp)
<p class="image-caption">AI 생성 이미지</p>

## Linux나 Windows 대신 맥북을 쓴 이유

Hermes는 Linux나 Windows에서도 사용할 수 있습니다. 메신저로 요청을 받아 처리할 용도라면 서버에 설치하는 방법도 있습니다.

저는 이미 갖고 있던 M1 맥북을 활용했습니다. 앞으로 iOS와 Android 앱까지 테스트하려는 점도 선택에 영향을 줬습니다.

Android 개발 환경은 다른 운영체제에도 구성할 수 있지만, iOS 앱을 Xcode와 시뮬레이터로 빌드하고 확인하려면 macOS가 필요합니다. 앞으로 두 플랫폼의 빌드와 테스트를 다루려면 맥북에 Hermes와 개발 환경을 함께 두는 편이 낫겠다고 생각했습니다.

## 다음 글에서는 설치와 연결을 다룹니다

안 쓰던 M1 맥북에 Hermes를 설치한 뒤로는 Discord에서 요청을 보내고 결과를 받고 있습니다. 지금 이 블로그 글을 준비하는 데도 같은 환경을 쓰고 있습니다.

다음 글에서는 ChatGPT 구독 연결과 Discord 봇 설정을 다룹니다. 맥북을 계속 켜 두고 사용하면서 챙긴 서비스와 전원 설정은 부록에 따로 모았습니다.

## 이 시리즈의 다른 글

- **1편 · 전체 구성과 선택 이유 — 현재 글**
- [2편 · 설치와 Discord 연결](/posts/hermes-setup-and-discord/)
- [부록 · 맥북을 켜 두고 사용할 때](/posts/hermes-gateway-macos-operation/)

## 참고 자료

- [Hermes Agent 공식 문서](https://hermes-agent.nousresearch.com/docs/){: target="_blank" rel="noopener noreferrer" }
- [Messaging Gateway](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/){: target="_blank" rel="noopener noreferrer" }
- [Discord 연결 안내](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/discord/){: target="_blank" rel="noopener noreferrer" }

[^providers]: [Hermes Agent — LLM and Model Providers](https://hermes-agent.nousresearch.com/docs/integrations/providers){: target="_blank" rel="noopener noreferrer" }
[^claude-login]: [Claude — Logging in to your Claude account](https://support.claude.com/en/articles/13189465-logging-in-to-your-claude-account){: target="_blank" rel="noopener noreferrer" }
[^claude-compliance]: [Claude Code — Legal and compliance](https://code.claude.com/docs/en/legal-and-compliance){: target="_blank" rel="noopener noreferrer" }
[^codex-auth]: [OpenAI Codex — Authentication](https://developers.openai.com/codex/auth){: target="_blank" rel="noopener noreferrer" }
[^openclaw-auth]: [OpenClaw — OpenAI provider](https://github.com/openclaw/openclaw/blob/main/docs/providers/openai.md){: target="_blank" rel="noopener noreferrer" }
[^openclaw-founder]: [Peter Steinberger — OpenClaw](https://steipete.me/posts/2026/openclaw){: target="_blank" rel="noopener noreferrer" }
[^claude-code-skill]: [Hermes — Claude Code skill](https://raw.githubusercontent.com/NousResearch/hermes-agent/main/skills/autonomous-ai-agents/claude-code/SKILL.md){: target="_blank" rel="noopener noreferrer" }
