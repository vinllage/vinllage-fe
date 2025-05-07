package org.koreait.board.mappers;

import org.apache.ibatis.annotations.Select;
import org.koreait.board.entities.BoardData;
import org.koreait.global.paging.SearchForm;

import java.util.List;
import java.util.Optional;

public interface BoardMapper {
    int register(BoardData item);
    int update(BoardData item);
    int delete(long seq);
    List<BoardData> getList(SearchForm search);
    Optional<BoardData> get(long seq);

    @Select("SELECT COUNT(*) FROM noticeBoard WHERE seq=#{seq}")
    int exists(long seq);
}
