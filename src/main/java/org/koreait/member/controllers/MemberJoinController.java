package org.koreait.member.controllers;

import org.koreait.global.exceptions.CommonException;
import org.koreait.global.router.Controller;
import org.koreait.global.router.Router;
import org.koreait.member.services.MemberJoinService;

import java.util.Scanner;

public class MemberJoinController extends Controller {

    private final MemberJoinService service;

    public MemberJoinController(MemberJoinService service) {
        this.service = service;
        /**
         * 가입 데이터를 받아야 하므로 직접 프롬프트를 정의한다.
         * 입력 항목
         * 1. 이메일
         * 2. 비밀번호
         * 3. 비밀번호 확인
         * 4. 휴대전화번호
         * 5. 약관 동의
         */
        JoinForm form = new JoinForm();
        setPrompt(() -> {
            while (true) {
                try {
                    Scanner sc = new Scanner(System.in);
                    String email = inputEach("1. 이메일", sc);
                    form.setEmail(email);

                    String password = inputEach("2. 비밀번호", sc);
                    form.setPassword(password);

                    String confirmPassword = inputEach("3. 비밀번호 확인", sc);
                    form.setConfirmPassword(confirmPassword);

                    String name = inputEach("4. 회원명", sc);
                    form.setName(name);

                    String mobile = inputEach("5. 휴대전화번호", sc);
                    form.setMobile(mobile);

                    String agree = inputEach("6. 회원가입에 동의하십니까? 동의(1),거부(0)", sc);
                    form.setTerms(agree.equals("1"));

                    service.process(form); // 회원가입 처리
                    break;
                } catch (CommonException e) {
                    printError(e);
                }
            }

            // 가입 성공시 로그인 화면으로 전환
            Router.change(MemberLoginController.class);
        });
    }

    @Override
    public void common() {
        System.out.println("***************** 회원가입 *********************");
    }

    @Override
    public void show() {
        System.out.println("회원 가입을 위해 다음을 입력해주세요(메인 메뉴 - m, 종료 - q).");
    }
}
