package org.koreait.member.controllers;

import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.member.MemberSession;

import java.util.List;

import static org.koreait.member.MemberSession.isAdmin;
import static org.koreait.member.MemberSession.isLogin;

public class MemberController extends Controller {

    @Override
    public void show() {
        setMenus(isAdmin() ? List.of("1", "2", "3", "4") : List.of("1", "2"));
        
        StringBuffer sb = new StringBuffer(5000);
        if (isLogin()) { // 로그인 상태
            sb.append("1. 회원정보\n")
                    .append("2. 회원정보 수정\n")
                    .append("3. 로그아웃");
            if (isAdmin()) {
                sb.append("4. 회원목록\n");
            }
        } else { // 미로그인 상태
            sb.append("1. 회원가입\n")
                    .append("2. 로그인");

        }
        System.out.println(sb);
    }

    @Override
    public void process(String command) {
        int menu = Integer.parseInt(command);
        switch (menu) {
            case 1:
                if (isLogin()) Router.change(MemberInfoController.class); // 회원정보 확인
                else Router.change(MemberJoinController.class); // 회원가입
                break;
            case 2:
                if (isLogin()) Router.change(MemberUpdateController.class); // 회원정보 수정
                else Router.change(MemberLoginController.class); // 로그인
                break;
            case 3: // 로그아웃 처리, 다시 로그인 화면으로 이동
                MemberSession.logout();
                Router.change(MemberLoginController.class);
                break;
            case 4:
                if (isAdmin()) { // 관리자일때 사용가능 메뉴
                    Router.change(MemberAdminController.class);
                }
                break;
        }
    }

}
