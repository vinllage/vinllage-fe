package org.koreait.member.controllers;

import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.member.MemberSession;
import org.koreait.member.services.MemberUpdateService;

import java.util.List;
import java.util.Scanner;

public class MemberUpdateController extends Controller {

    private final MemberUpdateService service;

    public MemberUpdateController(MemberUpdateService service) {
        this.service = service;
        setMenus(List.of("1", "2", "3"));
    }

    @Override
    public void common() {
        System.out.println("*************** 회원정보 수정 *******************");
    }

    @Override
    public void show() {
        System.out.println("변경할 번호를 선택하세요.");
        System.out.println("1. 회원명, 2. 휴대전화번호, 3. 비밀번호");
    }

    @Override
    public void process(String command) {
        int menu = Integer.parseInt(command);
        JoinForm form = new JoinForm();
        form.setEmail(MemberSession.getMember().getEmail()); // 로그인한 회원 이메일 정보

        Scanner sc = new Scanner(System.in);
        switch(menu) {
            case 1: // 회원명 변경
                String name = inputEach("변경할 회원명", sc);
                form.setName(name);
                break;
            case 2: // 휴대전화번호 변경
                String mobile = inputEach("변경할 휴대전화번호", sc);
                form.setMobile(mobile);
                break;
            case 3: // 비밀번호 변경
                String password = inputEach("변경할 비밀번호", sc);
                String confirmPassword = inputEach("변경할 비밀번호 확인", sc);
                form.setPassword(password);
                form.setConfirmPassword(confirmPassword);
                break;
        }

        service.process(form); // 회원정보 수정 처리

        // 회원정보 수정 완료 후 회원정보 확인 페이지로 이동
        Router.change(MemberInfoController.class);
    }
}
