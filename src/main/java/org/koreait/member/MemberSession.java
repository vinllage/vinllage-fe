package org.koreait.member;

import org.koreait.member.entities.Member;

/**
 * 로그인한 회원 정보를 보관하는 공간
 * member 값이 있다면 로그인 상태
 */
public class MemberSession {
    private static Member member;

    public static void setMember(Member member) {
        MemberSession.member = member;
    }

    // 로그인 회원정보 조회
    public static Member getMember() {
        return member;
    }

    // 로그인 여부
    public static boolean isLogin() {
        return member != null;
    }

    // 관리자 여부
    public static boolean isAdmin() {
        return isLogin() && member.isAdmin();
    }

    // 로그아웃 처리
    public static void logout() {
        member = null;
    }
}
