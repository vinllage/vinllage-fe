package org.koreait.member;

import org.apache.ibatis.session.SqlSession;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.koreait.global.configs.DBConn;
import org.koreait.global.paging.SearchForm;
import org.koreait.member.entities.Member;
import org.koreait.member.mappers.MemberMapper;

import java.util.List;
import java.util.Optional;

public class MapperTest {
    private DBConn dbConn;

    @BeforeEach
    void init() {
        dbConn = DBConn.getInstance();
    }

    @Test
    void test1() {
        SqlSession session = dbConn.getSession();
        MemberMapper mapper = session.getMapper(MemberMapper.class);
        Member member = new Member();
        member.setEmail("user02@test.org");
        member.setName("사용자02");
        member.setPassword("12345");
        member.setMobile("01034812101");
        member.setTerms(true);
        mapper.register(member);
        System.out.println(member);
    }

    @Test
    void test2() {
        SqlSession session = dbConn.getSession();
        MemberMapper mapper = session.getMapper(MemberMapper.class);
        Optional<Member> member = mapper.get("user01@test.org");
        System.out.println(member);
    }

    @Test
    void test3() {
        SqlSession session = dbConn.getSession();
        MemberMapper mapper = session.getMapper(MemberMapper.class);
        SearchForm search = new SearchForm();
        search.setOffset(0);
        search.setLimit(10);
        //search.setSopt("email");
        search.setSkey("user");
        List<Member> items = mapper.getList(search);
        items.forEach(System.out::println);
    }

    @Test
    void test4() {
        SqlSession session = dbConn.getSession();
        MemberMapper mapper = session.getMapper(MemberMapper.class);
        int cnt = mapper.exists("user01@test.org");
        System.out.println(cnt);
    }
}
