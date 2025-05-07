package org.koreait.main.controllers;

import org.koreait.board.controllers.BoardController;
import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.member.controllers.MemberController;

import java.util.List;

public class MainController extends Controller {
    public MainController() {
        // 메뉴 번호 설정
        setMenus(List.of("1", "2"));
    }

    @Override
    public void process(String command) {
        int menu = Integer.parseInt(command);
        switch (menu) {
            case 1: // 회원 관리
                Router.change(MemberController.class);
                break;
            case 2: // 게시판 관리
                Router.change(BoardController.class);
               break;
        }
    }

    @Override
    public void show() {
        StringBuffer sb = new StringBuffer(5000);
        sb.append("1. 회원관리\n")
                .append("2. 게시판 관리");
        System.out.println(sb);
    }
}
