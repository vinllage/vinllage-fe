package org.koreait.member.controllers;

import org.koreait.global.router.Controller;
import org.koreait.member.MemberSession;
import org.koreait.member.entities.Member;

public class MemberInfoController extends Controller {


    @Override
    public void common() {
        System.out.println("***************** 회원정보 *********************");
    }

    @Override
    public void show() {
        Member member = MemberSession.getMember();
        StringBuffer sb = new StringBuffer(5000);
        sb.append("1. 이메일: " + member.getEmail() + "\n")
                .append("2. 회원명: " + member.getName() + "\n")
                .append("3. 휴대전화번호: " + member.getMobile());
        System.out.println(sb);
    }
}
