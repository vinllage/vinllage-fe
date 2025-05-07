package org.koreait.board.services;

import org.koreait.board.entities.BoardData;
import org.koreait.board.mappers.BoardMapper;
import org.koreait.global.configs.DBConn;
import org.koreait.global.paging.SearchForm;

import java.util.List;

public class BoardInfoService {
    private BoardMapper mapper;

    public BoardInfoService(){

    }

    public void updateMapper() {
        mapper = DBConn.getInstance().getSession().getMapper(BoardMapper.class);
    }

    public BoardData get(long seq){
        updateMapper();
        return mapper.get(seq).orElseThrow(BootstrapMethodError::new);
    }

    public List<BoardData> getList(SearchForm search){
        updateMapper();
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
