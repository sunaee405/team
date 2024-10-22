package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLikeEntity is a Querydsl query type for LikeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikeEntity extends EntityPathBase<LikeEntity> {

    private static final long serialVersionUID = -1402100577L;

    public static final QLikeEntity likeEntity = new QLikeEntity("likeEntity");

    public final NumberPath<Integer> likedNo = createNumber("likedNo", Integer.class);

    public final NumberPath<Integer> memNo = createNumber("memNo", Integer.class);

    public final NumberPath<Integer> proNo = createNumber("proNo", Integer.class);

    public QLikeEntity(String variable) {
        super(LikeEntity.class, forVariable(variable));
    }

    public QLikeEntity(Path<? extends LikeEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLikeEntity(PathMetadata metadata) {
        super(LikeEntity.class, metadata);
    }

}

