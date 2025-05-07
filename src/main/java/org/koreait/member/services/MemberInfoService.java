package org.koreait.member.services;

import org.koreait.global.paging.SearchForm;
import org.koreait.member.entities.Member;
import org.koreait.member.exceptions.MemberNotFoundException;
import org.koreait.member.mappers.MemberMapper;

import java.util.List;

public class MemberInfoService  {

    private final MemberMapper mapper;


    public MemberInfoService(MemberMapper mapper) {
        this.mapper = mapper;
    }


    /**
     * 이메일 주소로 회원 1명 조회
     *
     * @param email
     * @return
     */

    public Member get(String email) {
        return mapper.get(email).orElseThrow(MemberNotFoundException::new);
    }

    /**
     * 회원 목록 조회
     *
     * @return
     */
    public List<Member> getList(SearchForm search) {
        int page = Math.max(search.getPage(), 1);
        int limit = search.getLimit();
        limit = limit < 1 ? 10 : limit;
        int offset = (page - 1) * limit;

        search.setOffset(offset);
        search.setPage(page);
        search.setLimit(limit);

       return mapper.getList(search);
    }
}
