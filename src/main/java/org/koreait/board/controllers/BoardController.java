package org.koreait.board.controllers;

import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.main.controllers.MainController;
import org.koreait.member.MemberSession;

public class BoardController extends Controller {
    public BoardController() {

    }
    @Override
    public void show() {
        // 로그인 상태가 아니라면 메인 페이지로 이동
        if (!MemberSession.isLogin()) {
            System.out.println("로그인이 필요합니다.");
            Router.change(MainController.class);
            return;
        }
        System.out.println("게시판 관리");
    }

    @Override
    public void process(String command) {
        System.out.println(command);

    }
}
