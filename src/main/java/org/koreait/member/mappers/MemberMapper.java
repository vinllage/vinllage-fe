package org.koreait.member.mappers;

import org.apache.ibatis.annotations.Select;
import org.koreait.global.paging.SearchForm;
import org.koreait.member.entities.Member;

import java.util.List;
import java.util.Optional;

public interface MemberMapper {
    int register(Member member);
    List<Member> getList(SearchForm search);
    Optional<Member> get(String email);

    @Select("SELECT COUNT(*) FROM member WHERE email=#{email}")
    int exists( String email);

    // 회원정보 수정
    int update(Member member);
}
