const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const TargetType = require('../../extension-support/target-type');
const formatMessage = require('format-message');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const MathUtil = require('../../util/math-util');

const io = require('socket.io-client');
//const io = require('http://localhost:4268/socket.io/socket.io.js');
//const io = require('../../../node_modules/socket.io-client/dist/socket.io');

var socket = io.connect('http://localhost:4268');

//const blockIconURI = 'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSItMTA5IDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4Ij48cGF0aCBkPSJtMjguNDc2NTYyIDE5Ny4yNDIxODhjLTE1LjcwMzEyNCAwLTI4LjQ3NjU2MiAxMi43NzM0MzctMjguNDc2NTYyIDI4LjQ3NjU2MnYxMjQuNTY2NDA2YzAgMTUuNzAzMTI1IDEyLjc3MzQzOCAyOC40NzY1NjMgMjguNDc2NTYyIDI4LjQ3NjU2MyAxNS43MDMxMjYgMCAyOC40NzY1NjMtMTIuNzczNDM4IDI4LjQ3NjU2My0yOC40NzY1NjN2LTEyNC41NzAzMTJjMC0xNS42OTkyMTktMTIuNzc3MzQ0LTI4LjQ3MjY1Ni0yOC40NzY1NjMtMjguNDcyNjU2em0wIDAiIGZpbGw9IiNjYWMwYzkiLz48cGF0aCBkPSJtMjguNDc2NTYyIDM0NC4wNTg1OTRjLTE1LjcwMzEyNCAwLTI4LjQ3NjU2Mi0xMi43NzczNDQtMjguNDc2NTYyLTI4LjQ3NjU2M3YzNC43MDMxMjVjMCAxNS43MDMxMjUgMTIuNzczNDM4IDI4LjQ3NjU2MyAyOC40NzY1NjIgMjguNDc2NTYzIDE1LjcwMzEyNiAwIDI4LjQ3NjU2My0xMi43NzM0MzggMjguNDc2NTYzLTI4LjQ3NjU2M3YtMzQuNzAzMTI1YzAgMTUuNjk5MjE5LTEyLjc3NzM0NCAyOC40NzY1NjMtMjguNDc2NTYzIDI4LjQ3NjU2M3ptMCAwIiBmaWxsPSIjYmJiMGJhIi8+PHBhdGggZD0ibTQ5LjQyOTY4OCA0MjAuNjcxODc1Yy00LjE1MjM0NCAwLTcuNTE5NTMyLTMuMzY3MTg3LTcuNTE5NTMyLTcuNTIzNDM3di0yMC45NTMxMjZjMC03LjQwNjI1LTYuMDI3MzQ0LTEzLjQzMzU5My0xMy40MzM1OTQtMTMuNDMzNTkzcy0xMy40MzM1OTMgNi4wMjczNDMtMTMuNDMzNTkzIDEzLjQzMzU5M3YyMC45NTMxMjZjMCA0LjE1NjI1LTMuMzY3MTg4IDcuNTIzNDM3LTcuNTE5NTMxIDcuNTIzNDM3LTQuMTU2MjUgMC03LjUyMzQzOC0zLjM2NzE4Ny03LjUyMzQzOC03LjUyMzQzN3YtMjAuOTUzMTI2YzAtMTUuNzAzMTI0IDEyLjc3MzQzOC0yOC40NzY1NjIgMjguNDc2NTYyLTI4LjQ3NjU2MiAxNS43MDMxMjYgMCAyOC40NzY1NjMgMTIuNzczNDM4IDI4LjQ3NjU2MyAyOC40NzY1NjJ2MjAuOTUzMTI2YzAgNC4xNTYyNS0zLjM2NzE4NyA3LjUyMzQzNy03LjUyMzQzNyA3LjUyMzQzN3ptMCAwIiBmaWxsPSIjOGM4MDhhIi8+PHBhdGggZD0ibTE3OS4wMzkwNjIgMTcwLjkyNTc4MWgtNjMuNTE1NjI0Yy00LjE1MjM0NCAwLTcuNTE5NTMyIDMuMzcxMDk0LTcuNTE5NTMyIDcuNTIzNDM4djI2LjMxMjVjMCA0LjE1NjI1IDMuMzY3MTg4IDcuNTIzNDM3IDcuNTE5NTMyIDcuNTIzNDM3aDYzLjUxNTYyNGM0LjE1NjI1IDAgNy41MjM0MzgtMy4zNjcxODcgNy41MjM0MzgtNy41MjM0Mzd2LTI2LjMxMjVjMC00LjE1NjI1LTMuMzY3MTg4LTcuNTIzNDM4LTcuNTIzNDM4LTcuNTIzNDM4em0wIDAiIGZpbGw9IiM5YzhmOWEiLz48cGF0aCBkPSJtMTQ3LjI4MTI1IDgxLjU0Njg3NWMtNC4xNTIzNDQgMC03LjUxOTUzMS0zLjM2NzE4Ny03LjUxOTUzMS03LjUxOTUzMXYtMjMuNTY2NDA2YzAtNC4xNTIzNDQgMy4zNjcxODctNy41MTk1MzIgNy41MTk1MzEtNy41MTk1MzIgNC4xNTYyNSAwIDcuNTIzNDM4IDMuMzY3MTg4IDcuNTIzNDM4IDcuNTE5NTMydjIzLjU2NjQwNmMwIDQuMTUyMzQ0LTMuMzY3MTg4IDcuNTE5NTMxLTcuNTIzNDM4IDcuNTE5NTMxem0wIDAiIGZpbGw9IiM4YzgwOGEiLz48cGF0aCBkPSJtMTEzLjE5MTQwNiAzMzYuNTM1MTU2aC00MS45MTAxNTZjLTQuMTUyMzQ0IDAtNy41MjM0MzggMy4zNjcxODgtNy41MjM0MzggNy41MjM0Mzh2MTEzLjAzNTE1NmMwIDIuNjk1MzEyIDEuNDQ1MzEzIDUuMTg3NSAzLjc4NTE1NyA2LjUyNzM0NCAyLjMzOTg0MyAxLjMzOTg0NCA1LjIxODc1IDEuMzI0MjE4IDcuNTQ2ODc1LS4wNDI5NjkgNS4xODM1OTQtMy4wNDI5NjkgMTEuMTEzMjgxLTQuNjUyMzQ0IDE3LjE0NDUzMS00LjY1MjM0NHMxMS45NjA5MzcgMS42MDkzNzUgMTcuMTQ4NDM3IDQuNjUyMzQ0YzEuMTc1NzgyLjY5MTQwNiAyLjQ5MjE4OCAxLjAzNTE1NiAzLjgwODU5NCAxLjAzNTE1NiAxLjI4OTA2MyAwIDIuNTc4MTI1LS4zMzIwMzEgMy43MzgyODItLjk5MjE4NyAyLjMzOTg0My0xLjMzOTg0NCAzLjc4MTI1LTMuODMyMDMyIDMuNzgxMjUtNi41MjczNDR2LTExMy4wMzUxNTZjMC00LjE1NjI1LTMuMzY3MTg4LTcuNTIzNDM4LTcuNTE5NTMyLTcuNTIzNDM4em0wIDAiIGZpbGw9IiNjYWMwYzkiLz48cGF0aCBkPSJtMjIzLjI4NTE1NiAzMzYuNTM1MTU2aC00MS45MTAxNTZjLTQuMTU2MjUgMC03LjUxOTUzMSAzLjM2NzE4OC03LjUxOTUzMSA3LjUyMzQzOHYxMTMuMDM1MTU2YzAgMi42OTUzMTIgMS40NDE0MDYgNS4xODc1IDMuNzgxMjUgNi41MjczNDQgMi4zMzk4NDMgMS4zMzk4NDQgNS4yMTg3NSAxLjMyNDIxOCA3LjU0Mjk2OS0uMDQyOTY5IDUuMTg3NS0zLjA0Mjk2OSAxMS4xMTcxODctNC42NTIzNDQgMTcuMTQ4NDM3LTQuNjUyMzQ0czExLjk2MDkzNyAxLjYwOTM3NSAxNy4xNDg0MzcgNC42NTIzNDRjMS4xNzU3ODIuNjkxNDA2IDIuNDkyMTg4IDEuMDM1MTU2IDMuODA4NTk0IDEuMDM1MTU2IDEuMjg5MDYzIDAgMi41NzgxMjUtLjMzMjAzMSAzLjczODI4Mi0uOTkyMTg3IDIuMzM5ODQzLTEuMzM5ODQ0IDMuNzgxMjUtMy44MzIwMzIgMy43ODEyNS02LjUyNzM0NHYtMTEzLjAzNTE1NmMwLTQuMTU2MjUtMy4zNjcxODgtNy41MjM0MzgtNy41MTk1MzItNy41MjM0Mzh6bTAgMCIgZmlsbD0iI2NhYzBjOSIvPjxwYXRoIGQ9Im0xMTMuMTkxNDA2IDMzNi41MzUxNTZoLTQxLjkxMDE1NmMtNC4xNTIzNDQgMC03LjUyMzQzOCAzLjM2NzE4OC03LjUyMzQzOCA3LjUyMzQzOHYyNy4wNzQyMThoNTYuOTUzMTI2di0yNy4wNzQyMThjMC00LjE1NjI1LTMuMzY3MTg4LTcuNTIzNDM4LTcuNTE5NTMyLTcuNTIzNDM4em0wIDAiIGZpbGw9IiNiYmIwYmEiLz48cGF0aCBkPSJtMjIzLjI4NTE1NiAzMzYuNTM1MTU2aC00MS45MTAxNTZjLTQuMTU2MjUgMC03LjUxOTUzMSAzLjM2NzE4OC03LjUxOTUzMSA3LjUyMzQzOHYyNy4wNzQyMThoNTYuOTQ5MjE5di0yNy4wNzQyMThjMC00LjE1NjI1LTMuMzY3MTg4LTcuNTIzNDM4LTcuNTE5NTMyLTcuNTIzNDM4em0wIDAiIGZpbGw9IiNiYmIwYmEiLz48cGF0aCBkPSJtMjMyLjAzNTE1NiA5My4yODEyNWMtNi44OTQ1MzEgMC0xMy41MDM5MDYgMi4xMTcxODgtMTkuMTEzMjgxIDYuMTE3MTg4LTEuOTgwNDY5IDEuNDE0MDYyLTMuMTUyMzQ0IDMuNjkxNDA2LTMuMTUyMzQ0IDYuMTI1djQxLjQyOTY4N2MwIDIuNDI5Njg3IDEuMTcxODc1IDQuNzEwOTM3IDMuMTUyMzQ0IDYuMTI1IDUuNjA5Mzc1IDQgMTIuMjE4NzUgNi4xMTMyODEgMTkuMTEzMjgxIDYuMTEzMjgxIDE4LjE3MTg3NSAwIDMyLjk1MzEyNS0xNC43ODEyNSAzMi45NTMxMjUtMzIuOTUzMTI1cy0xNC43ODEyNS0zMi45NTcwMzEtMzIuOTUzMTI1LTMyLjk1NzAzMXptMCAwIiBmaWxsPSIjY2FjMGM5Ii8+PHBhdGggZD0ibTgxLjY0NDUzMSA5OS4zOTg0MzhjLTUuNjA5Mzc1LTQtMTIuMjE4NzUtNi4xMTcxODgtMTkuMTEzMjgxLTYuMTE3MTg4LTE4LjE3MTg3NSAwLTMyLjk1NzAzMSAxNC43ODUxNTYtMzIuOTU3MDMxIDMyLjk1NzAzMXMxNC43ODUxNTYgMzIuOTUzMTI1IDMyLjk1NzAzMSAzMi45NTMxMjVjNi44OTA2MjUgMCAxMy41LTIuMTEzMjgxIDE5LjExMzI4MS02LjExMzI4MSAxLjk3NjU2My0xLjQxNDA2MyAzLjE1MjM0NC0zLjY5NTMxMyAzLjE1MjM0NC02LjEyNXYtNDEuNDI5Njg3YzAtMi40MzM1OTQtMS4xNzU3ODEtNC43MTQ4NDQtMy4xNTIzNDQtNi4xMjV6bTAgMCIgZmlsbD0iI2NhYzBjOSIvPjxwYXRoIGQ9Im0yMzIuMDM1MTU2IDEzNC42OTUzMTJjLTYuODk0NTMxIDAtMTMuNTAzOTA2LTIuMTEzMjgxLTE5LjExMzI4MS02LjExMzI4MS0xLjk4MDQ2OS0xLjQxNDA2Mi0zLjE1MjM0NC0zLjY5NTMxMi0zLjE1MjM0NC02LjEyNXYyNC40OTYwOTRjMCAyLjQyOTY4NyAxLjE3MTg3NSA0LjcxMDkzNyAzLjE1MjM0NCA2LjEyNSA1LjYwOTM3NSA0IDEyLjIxODc1IDYuMTEzMjgxIDE5LjExMzI4MSA2LjExMzI4MSAxOC4xNzE4NzUgMCAzMi45NTMxMjUtMTQuNzgxMjUgMzIuOTUzMTI1LTMyLjk1MzEyNSAwLTQuMzI4MTI1LS44NDM3NS04LjQ2MDkzNy0yLjM2NzE4Ny0xMi4yNS00Ljg3NSAxMi4xMjEwOTQtMTYuNzQyMTg4IDIwLjcwNzAzMS0zMC41ODU5MzggMjAuNzA3MDMxem0wIDAiIGZpbGw9IiNiYmIwYmEiLz48cGF0aCBkPSJtODEuNjQ0NTMxIDEyOC41ODIwMzFjLTUuNjA5Mzc1IDQtMTIuMjE4NzUgNi4xMTMyODEtMTkuMTEzMjgxIDYuMTEzMjgxLTEzLjg0Mzc1IDAtMjUuNzE0ODQ0LTguNTg1OTM3LTMwLjU4NTkzOC0yMC43MDcwMzEtMS41MjM0MzcgMy43ODkwNjMtMi4zNzEwOTMgNy45MjE4NzUtMi4zNzEwOTMgMTIuMjUgMCAxOC4xNzE4NzUgMTQuNzg1MTU2IDMyLjk1MzEyNSAzMi45NTcwMzEgMzIuOTUzMTI1IDYuODkwNjI1IDAgMTMuNS0yLjExMzI4MSAxOS4xMTMyODEtNi4xMTMyODEgMS45NzY1NjMtMS40MTQwNjMgMy4xNTIzNDQtMy42OTUzMTMgMy4xNTIzNDQtNi4xMjV2LTI0LjQ5NjA5NGMwIDIuNDI5Njg4LTEuMTc1NzgxIDQuNzEwOTM4LTMuMTUyMzQ0IDYuMTI1em0wIDAiIGZpbGw9IiNiYmIwYmEiLz48cGF0aCBkPSJtMjAyLjI0NjA5NCA2Ni41MDM5MDZoLTEwOS45Mjk2ODhjLTEyLjQ0MTQwNiAwLTIyLjU2MjUgMTAuMTI1LTIyLjU2MjUgMjIuNTY2NDA2djc0LjMzNTkzOGMwIDEyLjQ0MTQwNiAxMC4xMjEwOTQgMjIuNTYyNSAyMi41NjI1IDIyLjU2MjVoMTA5LjkyOTY4OGMxMi40NDE0MDYgMCAyMi41NjY0MDYtMTAuMTIxMDk0IDIyLjU2NjQwNi0yMi41NjI1di03NC4zMzU5MzhjMC0xMi40NDE0MDYtMTAuMTI1LTIyLjU2NjQwNi0yMi41NjY0MDYtMjIuNTY2NDA2em0wIDAiIGZpbGw9IiNlNmUyZTYiLz48cGF0aCBkPSJtMjAyLjI0NjA5NCAxNTcuMjYxNzE5aC0xMDkuOTI5Njg4Yy0xMi40NDE0MDYgMC0yMi41NjI1LTEwLjEyNS0yMi41NjI1LTIyLjU2NjQwN3YyOC43MTA5MzhjMCAxMi40NDE0MDYgMTAuMTIxMDk0IDIyLjU2MjUgMjIuNTYyNSAyMi41NjI1aDEwOS45Mjk2ODhjMTIuNDQxNDA2IDAgMjIuNTY2NDA2LTEwLjEyMTA5NCAyMi41NjY0MDYtMjIuNTYyNXYtMjguNzEwOTM4YzAgMTIuNDQxNDA3LTEwLjEyNSAyMi41NjY0MDctMjIuNTY2NDA2IDIyLjU2NjQwN3ptMCAwIiBmaWxsPSIjZDhkMWQ3Ii8+PHBhdGggZD0ibTExNC42MTMyODEgMTM1Ljc4MTI1Yy02LjMyNDIxOSAwLTExLjQ2ODc1LTUuMTQ0NTMxLTExLjQ2ODc1LTExLjQ2ODc1czUuMTQ0NTMxLTExLjQ2NDg0NCAxMS40Njg3NS0xMS40NjQ4NDRjNi4zMjAzMTMgMCAxMS40NjQ4NDQgNS4xNDA2MjUgMTEuNDY0ODQ0IDExLjQ2NDg0NHMtNS4xNDQ1MzEgMTEuNDY4NzUtMTEuNDY0ODQ0IDExLjQ2ODc1em0wIDAiIGZpbGw9IiM4YzgwOGEiLz48cGF0aCBkPSJtMTc5Ljk1MzEyNSAxMzUuNzgxMjVjLTYuMzI0MjE5IDAtMTEuNDY0ODQ0LTUuMTQ0NTMxLTExLjQ2NDg0NC0xMS40Njg3NXM1LjE0NDUzMS0xMS40NjQ4NDQgMTEuNDY0ODQ0LTExLjQ2NDg0NGM2LjMyNDIxOSAwIDExLjQ2ODc1IDUuMTQwNjI1IDExLjQ2ODc1IDExLjQ2NDg0NHMtNS4xNDQ1MzEgMTEuNDY4NzUtMTEuNDY4NzUgMTEuNDY4NzV6bTAgMCIgZmlsbD0iIzhjODA4YSIvPjxwYXRoIGQ9Im0xNDcuMjgxMjUgMGMtMTUuOTg0Mzc1IDAtMjguOTkyMTg4IDEzLjAwNzgxMi0yOC45OTIxODggMjguOTkyMTg4IDAgMTUuOTg0Mzc0IDEzLjAwNzgxMyAyOC45OTIxODcgMjguOTkyMTg4IDI4Ljk5MjE4NyAxNS45ODgyODEgMCAyOC45OTIxODgtMTMuMDA3ODEzIDI4Ljk5MjE4OC0yOC45OTIxODcgMC0xNS45ODQzNzYtMTMuMDAzOTA3LTI4Ljk5MjE4OC0yOC45OTIxODgtMjguOTkyMTg4em0wIDAiIGZpbGw9IiNmZjQ3NTUiLz48cGF0aCBkPSJtMTQ3LjI4MTI1IDM1LjIxNDg0NGMtMTEuOTQ1MzEyIDAtMjIuMjI2NTYyLTcuMjY1NjI1LTI2LjY2MDE1Ni0xNy42MDkzNzUtMS40OTYwOTQgMy41LTIuMzMyMDMyIDcuMzQ3NjU2LTIuMzMyMDMyIDExLjM4NjcxOSAwIDE1Ljk4NDM3NCAxMy4wMDc4MTMgMjguOTkyMTg3IDI4Ljk5MjE4OCAyOC45OTIxODdzMjguOTkyMTg4LTEzLjAwNzgxMyAyOC45OTIxODgtMjguOTkyMTg3YzAtNC4wMzkwNjMtLjgzMjAzMi03Ljg4NjcxOS0yLjMzMjAzMi0xMS4zODY3MTktNC40MzM1OTQgMTAuMzQzNzUtMTQuNzEwOTM3IDE3LjYwOTM3NS0yNi42NjAxNTYgMTcuNjA5Mzc1em0wIDAiIGZpbGw9IiNmYzJiM2EiLz48cGF0aCBkPSJtOTIuMjM0Mzc1IDQ0My44ODI4MTJjLTI3LjAxNTYyNSAwLTQ4Ljk5NjA5NCAyMS45ODA0NjktNDguOTk2MDk0IDQ4Ljk5NjA5NHYxMS41OTc2NTZjMCA0LjE1NjI1IDMuMzcxMDk0IDcuNTIzNDM4IDcuNTIzNDM4IDcuNTIzNDM4aDgyLjk0NTMxMmM0LjE1NjI1IDAgNy41MjM0MzgtMy4zNjcxODggNy41MjM0MzgtNy41MjM0Mzh2LTExLjU5NzY1NmMwLTI3LjAxNTYyNS0yMS45ODA0NjktNDguOTk2MDk0LTQ4Ljk5NjA5NC00OC45OTYwOTR6bTAgMCIgZmlsbD0iIzljOGY5YSIvPjxwYXRoIGQ9Im01MC43NjE3MTkgNTEyaDgyLjk0NTMxMmM0LjE1NjI1IDAgNy41MjM0MzgtMy4zNjcxODggNy41MjM0MzgtNy41MjM0Mzh2LTExLjU5NzY1NmMwLTMuODE2NDA2LS40NTMxMjUtNy41MjM0MzctMS4yODEyNS0xMS4wODk4NDRoLTk1LjQyOTY4OGMtLjgyODEyNSAzLjU2NjQwNy0xLjI4MTI1IDcuMjczNDM4LTEuMjgxMjUgMTEuMDg5ODQ0djExLjU5NzY1NmMwIDQuMTU2MjUgMy4zNzEwOTQgNy41MjM0MzggNy41MjM0MzggNy41MjM0Mzh6bTAgMCIgZmlsbD0iIzhjODA4YSIvPjxwYXRoIGQ9Im0yNjYuMDg5ODQ0IDE5Ny4yNDIxODhjMTUuNjk5MjE4IDAgMjguNDc2NTYyIDEyLjc3MzQzNyAyOC40NzY1NjIgMjguNDc2NTYydjEyNC41NjY0MDZjMCAxNS43MDMxMjUtMTIuNzc3MzQ0IDI4LjQ3NjU2My0yOC40NzY1NjIgMjguNDc2NTYzLTE1LjcwMzEyNSAwLTI4LjQ3NjU2My0xMi43NzM0MzgtMjguNDc2NTYzLTI4LjQ3NjU2M3YtMTI0LjU3MDMxMmMwLTE1LjY5OTIxOSAxMi43NzM0MzgtMjguNDcyNjU2IDI4LjQ3NjU2My0yOC40NzI2NTZ6bTAgMCIgZmlsbD0iI2NhYzBjOSIvPjxwYXRoIGQ9Im0yNjYuMDg5ODQ0IDM0NC4wNTg1OTRjMTUuNjk5MjE4IDAgMjguNDc2NTYyLTEyLjc3NzM0NCAyOC40NzY1NjItMjguNDc2NTYzdjM0LjcwMzEyNWMwIDE1LjcwMzEyNS0xMi43NzczNDQgMjguNDc2NTYzLTI4LjQ3NjU2MiAyOC40NzY1NjMtMTUuNzAzMTI1IDAtMjguNDc2NTYzLTEyLjc3MzQzOC0yOC40NzY1NjMtMjguNDc2NTYzdi0zNC43MDMxMjVjMCAxNS42OTkyMTkgMTIuNzczNDM4IDI4LjQ3NjU2MyAyOC40NzY1NjMgMjguNDc2NTYzem0wIDAiIGZpbGw9IiNiYmIwYmEiLz48cGF0aCBkPSJtMjQ1LjEzNjcxOSA0MjAuNjcxODc1YzQuMTUyMzQzIDAgNy41MTk1MzEtMy4zNjcxODcgNy41MTk1MzEtNy41MjM0Mzd2LTIwLjk1MzEyNmMwLTcuNDA2MjUgNi4wMjczNDQtMTMuNDMzNTkzIDEzLjQzMzU5NC0xMy40MzM1OTNzMTMuNDMzNTk0IDYuMDI3MzQzIDEzLjQzMzU5NCAxMy40MzM1OTN2MjAuOTUzMTI2YzAgNC4xNTYyNSAzLjM2NzE4NyA3LjUyMzQzNyA3LjUxOTUzMSA3LjUyMzQzNyA0LjE1NjI1IDAgNy41MjM0MzctMy4zNjcxODcgNy41MjM0MzctNy41MjM0Mzd2LTIwLjk1MzEyNmMwLTE1LjcwMzEyNC0xMi43NzM0MzctMjguNDc2NTYyLTI4LjQ3NjU2Mi0yOC40NzY1NjJzLTI4LjQ3NjU2MyAxMi43NzM0MzgtMjguNDc2NTYzIDI4LjQ3NjU2MnYyMC45NTMxMjZjMCA0LjE1NjI1IDMuMzY3MTg4IDcuNTIzNDM3IDcuNTIzNDM4IDcuNTIzNDM3em0wIDAiIGZpbGw9IiM4YzgwOGEiLz48cGF0aCBkPSJtMjQ1LjEzMjgxMiAxOTcuMjQyMTg4aC0xOTUuNzAzMTI0Yy00LjE1MjM0NCAwLTcuNTE5NTMyIDMuMzY3MTg3LTcuNTE5NTMyIDcuNTE5NTMxdjEzOS4yOTY4NzVjMCA0LjE1MjM0NCAzLjM2NzE4OCA3LjUxOTUzMSA3LjUxOTUzMiA3LjUxOTUzMWgxOTUuNzAzMTI0YzQuMTU2MjUgMCA3LjUyMzQzOC0zLjM2NzE4NyA3LjUyMzQzOC03LjUxOTUzMXYtMTM5LjI5Njg3NWMwLTQuMTUyMzQ0LTMuMzY3MTg4LTcuNTE5NTMxLTcuNTIzNDM4LTcuNTE5NTMxem0wIDAiIGZpbGw9IiNlNmUyZTYiLz48cGF0aCBkPSJtNDEuOTEwMTU2IDMxNi45ODA0Njl2MjcuMDc4MTI1YzAgNC4xNTIzNDQgMy4zNjcxODggNy41MTk1MzEgNy41MTk1MzIgNy41MTk1MzFoMTk1LjcwMzEyNGM0LjE1NjI1IDAgNy41MjM0MzgtMy4zNjcxODcgNy41MjM0MzgtNy41MTk1MzF2LTI3LjA3ODEyNXptMCAwIiBmaWxsPSIjZDhkMWQ3Ii8+PHBhdGggZD0ibTIwMi4zMzIwMzEgNDQzLjg4MjgxMmMtMjcuMDE5NTMxIDAtNDguOTk2MDkzIDIxLjk4MDQ2OS00OC45OTYwOTMgNDguOTk2MDk0djExLjU5NzY1NmMwIDQuMTU2MjUgMy4zNjcxODcgNy41MjM0MzggNy41MTk1MzEgNy41MjM0MzhoODIuOTQ5MjE5YzQuMTU2MjUgMCA3LjUyMzQzNy0zLjM2NzE4OCA3LjUyMzQzNy03LjUyMzQzOHYtMTEuNTk3NjU2Yy0uMDAzOTA2LTI3LjAxNTYyNS0yMS45ODA0NjktNDguOTk2MDk0LTQ4Ljk5NjA5NC00OC45OTYwOTR6bTAgMCIgZmlsbD0iIzljOGY5YSIvPjxwYXRoIGQ9Im0xNjAuODU1NDY5IDUxMmg4Mi45NDkyMTljNC4xNTIzNDMgMCA3LjUxOTUzMS0zLjM2NzE4OCA3LjUxOTUzMS03LjUyMzQzOHYtMTEuNTk3NjU2YzAtMy44MTY0MDYtLjQ0OTIxOS03LjUyMzQzNy0xLjI4MTI1LTExLjA4OTg0NGgtOTUuNDI1NzgxYy0uODMyMDMyIDMuNTY2NDA3LTEuMjgxMjUgNy4yNzM0MzgtMS4yODEyNSAxMS4wODk4NDR2MTEuNTk3NjU2YzAgNC4xNTYyNSAzLjM2NzE4NyA3LjUyMzQzOCA3LjUxOTUzMSA3LjUyMzQzOHptMCAwIiBmaWxsPSIjOGM4MDhhIi8+PC9zdmc+Cg==';
const blockIconURI = "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjUxMnB4IiB2aWV3Qm94PSItNDYgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiPjxwYXRoIGQ9Im00MTAgNDMwdjcyaC02MHYtMTEyaDIwYzIyLjA4OTg0NCAwIDQwIDE3LjkxMDE1NiA0MCA0MHptMCAwIiBmaWxsPSIjNjc2ZTc0Ii8+PHBhdGggZD0ibTMxMC4wNTA3ODEgOTBoLTIwMC4xMDE1NjJjLTIyLjA4OTg0NCAwLTQwIDE3LjkxMDE1Ni00MCA0MHYxNDBjMCAyMi4wODk4NDQgMTcuOTEwMTU2IDQwIDQwIDQwaDIwMC4xMDE1NjJjMjIuMDg5ODQ0IDAgNDAtMTcuOTEwMTU2IDQwLTQwdi0xNDBjMC0yMi4wODk4NDQtMTcuOTEwMTU2LTQwLTQwLTQwem0wIDAiIGZpbGw9IiNmZjgwYWMiLz48cGF0aCBkPSJtMzEwIDM1MGgtMjAwYy0yMi4wODk4NDQgMC00MCAxNy45MTAxNTYtNDAgNDB2MTEyaDI4MHYtMTEyYzAtMjIuMDg5ODQ0LTE3LjkxMDE1Ni00MC00MC00MHptMCAwIiBmaWxsPSIjZmY4MGFjIi8+PGcgZmlsbD0iI2ZmZjM1YyI+PHBhdGggZD0ibTMxMCAxNjBjMCAxNi41NzAzMTItMTMuNDI5Njg4IDMwLTMwIDMwcy0zMC0xMy40Mjk2ODgtMzAtMzAgMTMuNDI5Njg4LTMwIDMwLTMwIDMwIDEzLjQyOTY4OCAzMCAzMHptMCAwIi8+PHBhdGggZD0ibTI3MCAyMzBoLTEyMGMtMTEuMDUwNzgxIDAtMjAgOC45NDkyMTktMjAgMjB2NjBoMTYwdi02MGMwLTExLjA1MDc4MS04Ljk0OTIxOS0yMC0yMC0yMHptMCAwIi8+PHBhdGggZD0ibTI3MCA0NTB2NTJoLTEyMHYtNTJjMC0xMS4wNTA3ODEgOC45NDkyMTktMjAgMjAtMjBoODBjMTEuMDUwNzgxIDAgMjAgOC45NDkyMTkgMjAgMjB6bTAgMCIvPjwvZz48cGF0aCBkPSJtMTUwIDMxMGgxMjB2NDBoLTEyMHptMCAwIiBmaWxsPSIjNjc2ZTc0Ii8+PHBhdGggZD0ibTI3MCA3MHYyMGgtMTIwdi0yMGMwLTExLjA1MDc4MSA4Ljk0OTIxOS0yMCAyMC0yMGg4MGMxMS4wNTA3ODEgMCAyMCA4Ljk0OTIxOSAyMCAyMHptMCAwIiBmaWxsPSIjNjc2ZTc0Ii8+PHBhdGggZD0ibTE3MCAxNjBjMCAxNi41NzAzMTItMTMuNDI5Njg4IDMwLTMwIDMwcy0zMC0xMy40Mjk2ODgtMzAtMzAgMTMuNDI5Njg4LTMwIDMwLTMwIDMwIDEzLjQyOTY4OCAzMCAzMHptMCAwIiBmaWxsPSIjZmZmMzVjIi8+PHBhdGggZD0ibTcwIDM5MHYxMTJoLTYwdi03MmMwLTIyLjA4OTg0NCAxNy45MTAxNTYtNDAgNDAtNDB6bTAgMCIgZmlsbD0iIzY3NmU3NCIvPjxwYXRoIGQ9Im0xMCA1MTJoNDAwYzUuNTIzNDM4IDAgMTAtNC40NzY1NjIgMTAtMTB2LTcyYzAtMjcuNTcwMzEyLTIyLjQyOTY4OC01MC01MC01MGgtMTEuMDA3ODEyYy00LjY0NDUzMi0yMi43OTY4NzUtMjQuODQzNzUtNDAtNDguOTkyMTg4LTQwaC0zMHYtMjBoMzAuMDUwNzgxYzI3LjU3MDMxMyAwIDQ5Ljk0OTIxOS0yMi40Mjk2ODggNDkuOTQ5MjE5LTUwdi0xNDBjMC0yNy41NzAzMTItMjIuMzc4OTA2LTUwLTQ5Ljk0OTIxOS01MGgtMzAuMDUwNzgxdi0xMGMwLTE2LjU0Mjk2OS0xMy40NTcwMzEtMzAtMzAtMzBoLTMwdi0zMGMwLTUuNTIzNDM4LTQuNDc2NTYyLTEwLTEwLTEwcy0xMCA0LjQ3NjU2Mi0xMCAxMHYzMGgtMzBjLTE2LjU0Mjk2OSAwLTMwIDEzLjQ1NzAzMS0zMCAzMHYxMGgtMzAuMDUwNzgxYy0yNy41NzAzMTMgMC00OS45NDkyMTkgMjIuNDI5Njg4LTQ5Ljk0OTIxOSA1MHY2MGMwIDUuNTIzNDM4IDQuNDI1NzgxIDEwIDkuOTQ5MjE5IDEwIDUuNTIzNDM3IDAgMTAtNC40NzY1NjIgMTAtMTB2LTIwaDIxLjMxNjQwNmM0LjQ1MzEyNSAxNy4yMzQzNzUgMjAuMTI4OTA2IDMwIDM4LjczNDM3NSAzMCAyMi4wNTQ2ODggMCA0MC0xNy45NDUzMTIgNDAtNDBzLTE3Ljk0NTMxMi00MC00MC00MGMtMTguNjA1NDY5IDAtMzQuMjgxMjUgMTIuNzY1NjI1LTM4LjczNDM3NSAzMGgtMjEuMzE2NDA2di0yMGMwLTE2LjU0Mjk2OSAxMy40NTcwMzEtMzAgMzAtMzBoMjAwLjEwMTU2MmMxNi41NDI5NjkgMCAzMCAxMy40NTcwMzEgMzAgMzB2MjBoLTIxLjMxNjQwNmMtNC40NTMxMjUtMTcuMjM0Mzc1LTIwLjEyODkwNi0zMC0zOC43MzQzNzUtMzAtMjIuMDU0Njg4IDAtNDAgMTcuOTQ1MzEyLTQwIDQwczE3Ljk0NTMxMiA0MCA0MCA0MGMxOC42MDU0NjkgMCAzNC4yODEyNS0xMi43NjU2MjUgMzguNzM0Mzc1LTMwaDIxLjMxNjQwNnYxMDBjMCAxNi41NDI5NjktMTMuNDU3MDMxIDMwLTMwIDMwaC0xMC4wNTA3ODF2LTUwYzAtMTYuNTQyOTY5LTEzLjQ1NzAzMS0zMC0zMC0zMGgtMTIwYy0xNi41NDI5NjkgMC0zMCAxMy40NTcwMzEtMzAgMzB2NTBoLTEwLjA1MDc4MWMtMTYuNTQyOTY5IDAtMzAtMTMuNDU3MDMxLTMwLTMwIDAtNS41MjM0MzgtNC40NzY1NjMtMTAtMTAtMTAtNS41MjM0MzggMC0xMCA0LjQ3NjU2Mi0xMCAxMCAwIDI3LjU3MDMxMiAyMi40Mjk2ODcgNTAgNTAgNTBoMzAuMDUwNzgxdjIwaC0zMGMtMjQuMTQ0NTMxIDAtNDQuMzQ3NjU2IDE3LjIwMzEyNS00OC45OTIxODggNDBoLTExLjAwNzgxMmMtMjcuNTcwMzEyIDAtNTAgMjIuNDI5Njg4LTUwIDUwdjcyYzAgNS41MjM0MzggNC40NzY1NjIgMTAgMTAgMTB6bTEzMC0zNzJjMTEuMDI3MzQ0IDAgMjAgOC45NzI2NTYgMjAgMjBzLTguOTcyNjU2IDIwLTIwIDIwLTIwLTguOTcyNjU2LTIwLTIwIDguOTcyNjU2LTIwIDIwLTIwem0yMC03MGMwLTUuNTE1NjI1IDQuNDg0Mzc1LTEwIDEwLTEwaDgwYzUuNTE1NjI1IDAgMTAgNC40ODQzNzUgMTAgMTB2MTBoLTEwMHptMTIwIDExMGMtMTEuMDI3MzQ0IDAtMjAtOC45NzI2NTYtMjAtMjBzOC45NzI2NTYtMjAgMjAtMjAgMjAgOC45NzI2NTYgMjAgMjAtOC45NzI2NTYgMjAtMjAgMjB6bS0yMCAzMTJoLTEwMHYtNDJjMC01LjUxNTYyNSA0LjQ4NDM3NS0xMCAxMC0xMGg4MGM1LjUxNTYyNSAwIDEwIDQuNDg0Mzc1IDEwIDEwem0xNDAtNjJ2NjJoLTQwdi05MmgxMGMxNi41NDI5NjkgMCAzMCAxMy40NTcwMzEgMzAgMzB6bS0yNTAtMTkwaDEyMGM1LjUxNTYyNSAwIDEwIDQuNDg0Mzc1IDEwIDEwdjEwaC0xNDB2LTEwYzAtNS41MTU2MjUgNC40ODQzNzUtMTAgMTAtMTB6bS0xMCA0MGgxNDB2MjBoLTE0MHptMjAgNDBoMTAwdjIwaC0xMDB6bS01MCA0MGgyMDBjMTYuNTQyOTY5IDAgMzAgMTMuNDU3MDMxIDMwIDMwdjEwMmgtNjB2LTQyYzAtMTYuNTQyOTY5LTEzLjQ1NzAzMS0zMC0zMC0zMGgtODBjLTE2LjU0Mjk2OSAwLTMwIDEzLjQ1NzAzMS0zMCAzMHY0MmgtNjB2LTEwMmMwLTE2LjU0Mjk2OSAxMy40NTcwMzEtMzAgMzAtMzB6bS02MCA0MGgxMHY5MmgtNDB2LTYyYzAtMTYuNTQyOTY5IDEzLjQ1NzAzMS0zMCAzMC0zMHptMCAwIi8+PHBhdGggZD0ibTgwIDIzMGMwIDUuNTIzNDM4LTQuNDc2NTYyIDEwLTEwIDEwcy0xMC00LjQ3NjU2Mi0xMC0xMCA0LjQ3NjU2Mi0xMCAxMC0xMCAxMCA0LjQ3NjU2MiAxMCAxMHptMCAwIi8+PC9zdmc+Cg==";

const LOW = 0;
const HIGH = 1;
const MAX_SALIDAS = 4; 
const MAX_ENTRADAS = 4; 
const MAX_SERVOS = 2; 
const THRESHOLD_HIGH = 768;
const THRESHOLD_LOW = 256;

var OUTPUT = class {
    /**
   * Class Output
   * @constructor 
   *
   * @param index {Integer} output number
   * 
   */
    constructor(index) {
      this.index = index;
    }
    /**
   * On(): Turns ouput on
   *
   */
    on() {
      socket.emit('OUTPUT', { index: this.index, method: 'on' });
    }
    /**
   * Off(): Turns ouput off
   *
   */
    off() {
      socket.emit('OUTPUT', { index: this.index, method: 'off' });
    }
    /**
   * Brake(): Applies brake
   *
   */
    brake() {
      socket.emit('OUTPUT', { index: this.index, method: 'brake' });
    }
    /**
   * Inverse(): Inverts direction
   *
   */
    inverse() {
      socket.emit('OUTPUT', { index: this.index, method: 'inverse' }); 
    }
    /**
   * Direction(): Sets direction
   *
   * @param dir {Integer} direction: 0, 1
   * 
   */
    direction(dir) {
      socket.emit('OUTPUT', { index: this.index, method: 'direction', param: dir });
    }
    /**
   * Power(): Sets pwm power
   *
   * @param pow {Integer} power: 0 to 255
   * 
   */
    power(pow) {
      socket.emit('OUTPUT', { index: this.index, method: 'power', param: pow });
    }
  };


 var STEPPER = class {
    /**
   * class Stepper
   * @constructor
   *
   * @param index {Integer} motor number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('STEPPER_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });
    }
    /**
   * Steps(): Moves the motor the amount of steps
   *
   * @param value {Integer}steps
   * @param callback {Function} callback function
   */
    steps(value, callback) {
      socket.emit('STEPPER', { index: this.index, method: 'steps', param: value });
      if (typeof callback == "function")
        this.callback = callback;
  }
  /**
 * Stop(): Stops the motor 
 *
 */
  stop() {
    socket.emit('STEPPER', { index: this.index, method: 'stop' });
  }
  /**
 * Speed(): Changes motor speed
 *
 * @param value {Integer} speed in steps per second
 * 
 */
  speed(value) {
    socket.emit('STEPPER', { index: this.index, method: 'speed', param: value });
  }
}

var   SERVO = class {
    /**
   * class Servo
   * @constructor
   *
   * @param index {Integer} motor number
   * 
   */
    constructor(index) {
      this.index = index;
    }
    /**
   * Position(): Sets position
   *
   * @param value {Integer}servo position: 0 to 180
   * 
   */
    position(value) {
      socket.emit('SERVO', { index: this.index, method: 'position', param: value });
    }
  }

 var  ANALOG = class {
    /**
   * class Analog
   * @constructor
   *
   * @param index {Integer} analog number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('ANALOG_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });      
    }
    /**
   * On(): Turns reporting on
   *
   * @param callback {Function} callback function
   */    
    on(callback) {
      socket.emit('ANALOG', { index: this.index, method: 'on' });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Off(): Turns reporting off
   *
   */       
    off() { 
      socket.emit('ANALOG', { index: this.index, method: 'off' });
    }
  }

var  DIGITAL = class {
    /**
   * class Digital
   * @constructor
   *
   * @param index {Integer} digital number
   * 
   */
    constructor(index) {
      this.index = index;
      this.callback = function () { };
      var me = this;
      socket.on('DIGITAL_MESSAGE', function (data) {
        if(data.index == me.index)
          me.callback(data);
      });      
    }
    /**
   * On(): Turns reporting on
   *
   * @param callback {Function} callback function
   */    
    on(callback) {
      socket.emit('DIGITAL', { index: this.index, method: 'on' });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Off(): Turns reporting off
   *
   */       
    off() { 
      socket.emit('DIGITAL', { index: this.index, method: 'off' });
    }
    /**
   * Pullup(): Enable or disable pullup
   *
   * @param enable {Boolean} Enables or disables.
   */       
    pullup(enable) { 
      socket.emit('DIGITAL', { index: this.index, method: 'pullup', param: enable });
    }
  }

  var I2C = class {
    /**
   * class I2C
   * @constructor
   *
   * @param address {Integer} device address
   * 
   */
    constructor(address) {
      this.address = address;
      this.callback = function () { };
      var me = this;
      socket.on('I2C_MESSAGE', function (data) {
        if (data.address == me.address)
          me.callback(data);
      });
    }
    /**
   * On(): Turns reporting on
   *
   * @param register {Integer} register to read
   * @param bytes {Integer} amount of bytes to read
   * @param callback {Function} callback function
   */    
    on(register, bytes, callback) {
      socket.emit('I2C', { address: this.address, register: register, method: 'on', param: bytes });
      if (typeof callback == "function")
      this.callback = callback;
    }
    /**
   * Off(): Turns reporting off
   *
   off(register) { 
     socket.emit('I2C', { address: this.address, register: register, method: 'off' });
    }
*/           
      /**
     * Read(): Reads register once
     *
     * @param register {Integer} register to read
     * @param bytes {Integer} amount of bytes to read
     * @param callback {Function} callback function
     */    
    read(register, bytes, callback) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'read', param: bytes });
      if (typeof callback == "function")
      this.callback = callback;
    }  
    /**
   * Write(): Writes data into register
   *
   * @param register {Integer} register to read
   * @param data {Array of bytes} data to write
   */    
    write(register, data) { 
      socket.emit('I2C', { address: this.address, register: register, method: 'write', param: data });
    }    
  }

/**
 * Device object to connect to device class
 * class Device
 *
 * @this .device {String} Name of class.
 * @this .options {Object} Options to pass as parameters of class
 *
 * example:
 *      light = new Device('Light', { controller: "BH1750"}); 
 *      led = new Device('Led', { pin: 13});
 */  
class Device {
    constructor(device, options) { 
    this.device = device;
    this.options = options;
    this.id = false;
    let me = this;
    socket.emit('DEVICE', {  device: device, options: options}, function (result) {
      me.id = result;
    });
  }

/**
 * On(): Create event listener
 *
 * @param event {String} Event to listen
 * @param attributes {Object} Attributes to receive from device
 * @param callback {myCallback} Callback to execute on data received
 * 
 * example:
 *  gps.on("change", ["latitude","longitude"] , function(d) { console.log(d) });
 */  
  on(event, attributes, callback) {
      socket.emit('DEVICE_EVENT', { id: this.id, event: event, attributes: attributes}, function (result) {
        console.log(result);
    });
    let me = this;
      if(typeof callback == "function")
        socket.on(event + this.id, function (data) {
            callback(data);
        })
  }

/**
 * Call(): Call method on device
 *
 * @param method {String} method to run with parenthesis and parameters
 * 
 * example:
 *    led.call('on(10)');
 */  
  call(method) {
    socket.emit('DEVICE_CALL', { id: this.id, method: method }, function (result) { 
      console.log(result);
    })
  }

  }

class Scratch3Interfaz {
    constructor (runtime) {
        this.runtime = runtime;
        //this.runtime.emit(this.runtime.constructor.PERIPHERAL_CONNECTED);

        this.interfaz = {
            salidas: [new OUTPUT(1),new OUTPUT(2),new OUTPUT(3),new OUTPUT(4)],
            entradas: [new ANALOG(1),new ANALOG(2),new ANALOG(3),new ANALOG(4)],
            servos: [new SERVO(1),new SERVO(2)],
            analogValues: [0,0,0,0],
            analogThreshold: [512,512,512,512],
            analogHIGH: [false, false, false, false],
            analogLOW: [false, false, false, false],
            entradaActiva: 0
        }
    }

    getInfo () {
        return {
            id: 'interfaz',
            name: 'Robótica',
            blockIconURI: blockIconURI,
           // showStatusButton: true,
            blocks: [
              /*
                {
                    opcode: 'conectar',
                    blockType: BlockType.COMMAND,
                    text: 'Cconectar'
                },
                */
                {
                    opcode: 'salidas',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidas',
                        default: 'salida [SALIDAS_PARAM] [SALIDAS_OP_PARAM]',
                        description: 'Acción sobre la salida'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasDireccion',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidasDireccion',
                        default: 'salida [SALIDAS_PARAM] dirección [SALIDAS_DIR_PARAM]',
                        description: 'Establece la polaridad de la salida [A-B]'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_DIR_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'direccion',
                            defaultValue: 'a' 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasPotencia',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidasPotencia',
                        default: 'salida [SALIDAS_PARAM] potencia [SALIDAS_POT_PARAM] %',
                        description: 'Establece la potencia de la salida [0-100]%'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_POT_PARAM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100 
                        }                    
                    } 
                },
                {
                    opcode: 'salidasByTime',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.salidasByTime',
                        default: 'salida [SALIDAS_PARAM] encender  [LEDS_TIME] segundos',
                        description: 'Enciende salidas por un tiempo en [segundos]'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },      
                        LEDS_TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1 
                        }                    
                    } 
                },'---',
                {
                    opcode: 'ledAccion',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.ledAccion',
                        default: 'led [SALIDAS_PARAM]  [SALIDAS_LED_OP] ',
                        description: 'Enciende/apaga leds'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },                    
                        SALIDAS_LED_OP: {
                            type: ArgumentType.STRING,
                            menu: 'leds_op',
                            defaultValue: 'encender A'
                        }                    
                    } 
                },
                {
                    opcode: 'ledsByTime',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.ledsByTime',
                        default: 'led [SALIDAS_PARAM]  [SALIDAS_LED_OP_TIME]  [LEDS_TIME] segundos',
                        description: 'Enciende leds por un tiempo en [segundos]'
                    }),
                    arguments: {
                        SALIDAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'salidas',
                            defaultValue: '1' 
                        },      
                        SALIDAS_LED_OP_TIME: {
                            type: ArgumentType.STRING,
                            menu: 'leds_op_time',
                            defaultValue: 'encender A'
                        },
                        LEDS_TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1 
                        }                    
                    } 
                },'---',

                {
                    opcode: 'servoPosicion',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.servoPosicion',
                        default: 'servo [SERVOS_PARAM] posición [SERVOS_POSICION]',
                        description: 'Posiciona el servomotor'
                    }),
                    arguments: {
                        SERVOS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'servos',
                            defaultValue: '1' 
                        },                    
                        SERVOS_POSICION: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 90 
                        }                    
                    } 
                },'---',
                {
                    opcode: 'entradas',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.entradasAccion',
                        default: 'entrada [ENTRADAS_PARAM] [ENTRADAS_OP_PARAM]',
                        description: 'Enciende/apaga el reporte de entradas'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADAS_OP_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas_op',
                            defaultValue: 'encender' 
                        }                    
                    } 
                },
                {
                    opcode: 'entradaValor',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaValor',
                        default: 'entrada [ENTRADAS_PARAM] valor',
                        description: 'Reporta el valor de la entrada'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        }                    
                    } 
                },
                {
                    opcode: 'entradaEstado',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'interfaz.entradaEstado',
                        default: 'entrada [ENTRADAS_PARAM] estado [ENTRADA_ESTADO]',
                        description: 'Reporta el estado de la entrada [alto-bajo]'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_ESTADO: {
                            type: ArgumentType.STRING,
                            menu: 'estados',
                            defaultValue: 'alto' 
                        }                    
                    } 
                },
                /*
                {
                    opcode: 'entradaUmbral',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'interfaz.entradaUmbral',
                        default: 'entrada [ENTRADAS_PARAM]  umbral [ENTRADA_UMBRAL]',
                        description: 'Reporta el valor de la entrada'
                    }),
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },
                        ENTRADA_UMBRAL: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 512
                        }                    
                    } 
                },
                {
                    opcode: 'entradaActiva',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'interfaz.entradaActiva',
                        default: 'valor entrada activa',
                        description: 'Reporta el valor de la última entrada activada'
                    }),
                },*/
                '---',
                {
                    opcode: 'cuandoEntradaValor',
                    text: formatMessage({
                        id: 'interfaz.cuandoEntradaValor',
                        default: 'cuando entrada [ENTRADAS_PARAM] [ENTRADA_OPERADOR] [ENTRADA_VALOR]',
                        description: 'Cuando el valor de la entrada es  [mayor-menor-igual] que el [valor]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_OPERADOR: {
                            type: ArgumentType.NUMBER,
                            menu: 'operadores',
                            defaultValue: '>'
                        },                    
                        ENTRADA_VALOR: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 512
                        }                    
                    }
                },
                {
                    opcode: 'cuandoEntradaEstado',
                    text: formatMessage({
                        id: 'interfaz.cuandoEntradaEstado',
                        default: 'cuando entrada [ENTRADAS_PARAM]  [ENTRADA_ESTADO]',
                        description: 'Cuando la entrada esta en estado [alto-bajo]'
                    }),
                    blockType: BlockType.HAT,
                    arguments: {
                        ENTRADAS_PARAM: {
                            type: ArgumentType.STRING,
                            menu: 'entradas',
                            defaultValue: '1' 
                        },                    
                        ENTRADA_ESTADO: {
                            type: ArgumentType.STRING,
                            menu: 'estados',
                            defaultValue: 'alto' 
                        }                    
                    }
                },'---',

            ],
            menus: {
                salidas: ['1','2','3','4'],
                salidas_op: ['encender', 'apagar', 'invertir', 'frenar'],
                leds_op: ['encender A', 'encender B', 'apagar', 'cambiar'],
                leds_op_time: ['encender A', 'encender B'],
                entradas: ['1','2','3','4'],
                entradas_op: ['encender', 'apagar'],
                servos: ['1','2'],
                direccion: ['a','b'],
                estados: ['alto','bajo'],
                operadores: ['>','<', '='],
            }
        };
    }

    salidas (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        switch(args.SALIDAS_OP_PARAM) {
            case 'encender': case 1: s.on(); break;
            case 'apagar': case 2: s.off(); break;
            case 'invertir': case 3: s.inverse(); break;
            case 'frenar': case 4: s.brake(); break;
            default: s.off();
        }
    };

    salidasDireccion (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        switch(args.SALIDAS_DIR_PARAM) {
            case 'a': case 1: s.direction(0); break;
            case 'b': case 2: s.direction(1); break;
        }
    };

    salidasPotencia (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        var p = MathUtil.clamp(255*Cast.toNumber(args.SALIDAS_POT_PARAM)/100, 0, 255);
        s.power(p);        
    };

    salidasByTime (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        let time = Cast.toNumber(args.LEDS_TIME) * 1000;
        time = MathUtil.clamp(time, 0, 30000);
        
        if (time === 0) {
            return; // don't send a beep time of 0
        }
        
        return new Promise(resolve => {
            s.on();
            setTimeout(() => s.off(), time);
            setTimeout(resolve, time);
        });

    };

    ledAccion (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        s.power(128);
        switch(args.SALIDAS_LED_OP) {
            case 'encender A': case 1: s.power(128); s.direction(0); s.on(); break;
            case 'encender B': case 2: s.power(128); s.direction(1); s.on(); break;
            case 'apagar': case 3: s.off(); break;
            case 'cambiar': case 4: s.inverse(); break;
            default: s.off();
        }
    };

    ledsByTime (args, util) {
        if(args.SALIDAS_PARAM > MAX_SALIDAS) return;
        var s = this.interfaz.salidas[args.SALIDAS_PARAM - 1];
        let time = Cast.toNumber(args.LEDS_TIME) * 1000;
        time = MathUtil.clamp(time, 0, 30000);
        
        if (time === 0) {
            return; // don't send a beep time of 0
        }
        
        return new Promise(resolve => {
            s.power(128);
            switch(args.SALIDAS_LED_OP_TIME) {
                case 'encender A': case 1: s.power(128); s.direction(0); s.on(); break;
                case 'encender B': case 2: s.power(128); s.direction(1); s.on(); break;
                default: s.off();
            }
            setTimeout(() => s.off(), time);
            setTimeout(resolve, time);
        });

    };

    entradas (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        i.entradaActiva = args.ENTRADAS_PARAM;
        var s = i.entradas[args.ENTRADAS_PARAM - 1];
        switch(args.ENTRADAS_OP_PARAM) {
            case 'encender': case 1: s.on(function(data){
                i.analogValues[data.index -1 ] = data.value;
                i.analogHIGH[data.index -1] = data.value > THRESHOLD_HIGH;
                i.analogLOW[data.index -1] = data.value < THRESHOLD_LOW;
            }); break;
            case 'apagar': case 2: 
                s.off(); 
                i.analogValues[args.ENTRADAS_OP_PARAM -1 ] = 0;
                i.analogHIGH[args.ENTRADAS_OP_PARAM -1] = false;
                i.analogLOW[args.ENTRADAS_OP_PARAM -1] = false;
                break;
            default: s.off();
        }
    };
    
    entradaValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        i.entradaActiva = args.ENTRADAS_PARAM;
        return i.analogValues[args.ENTRADAS_PARAM - 1];
    }

    entradaEstado (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        i.entradaActiva = args.ENTRADAS_PARAM;
        var v = false;
        switch(args.ENTRADA_ESTADO) {
            case 'alto': case 1:  v =  i.analogHIGH[args.ENTRADAS_PARAM - 1] ; break;
            case 'bajo': case 0:  v =  i.analogLOW[args.ENTRADAS_PARAM - 1] ; break;
        }
        return v;
    }
    
    cuandoEntradaEstado (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var v = false;
        switch(args.ENTRADA_ESTADO) {
            case 'alto': case 1:  v =  i.analogHIGH[args.ENTRADAS_PARAM - 1]  ; break;
            case 'bajo': case 0:  v =  i.analogLOW[args.ENTRADAS_PARAM - 1] ; break;
        }
        return v;
    }

    cuandoEntradaValor (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        var v = false;
        switch(args.ENTRADA_OPERADOR) {
            case '>':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] > Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '<':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] < Cast.toNumber(args.ENTRADA_VALOR) ; break;
            case '=':   v =  i.analogValues[args.ENTRADAS_PARAM - 1] = Cast.toNumber(args.ENTRADA_VALOR) ; break;
        }
        return v;
    }

    entradaActiva (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
        if(i.entradaActiva === 0) return 0;
        return i.analogValues[i.entradaActiva - 1];
    }

    entradaUmbral (args, util) {
        if(args.ENTRADAS_PARAM > MAX_ENTRADAS) return;
        var i = this.interfaz;
         i.analogThreshold[args.ENTRADAS_PARAM - 1] = MathUtil.clamp(args.ENTRADA_UMBRAL,0,1023);
    }

    servoPosicion (args, util) {
        if(args.SERVOS_PARAM > MAX_SERVOS) return;
        var s = this.interfaz.servos[args.SERVOS_PARAM - 1];
        console.log(args.SERVOS_POSICION);
        s.position( MathUtil.clamp(Math.abs(args.SERVOS_POSICION),0,180));
    };


}

module.exports = Scratch3Interfaz;