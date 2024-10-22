package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNewsEntity is a Querydsl query type for NewsEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNewsEntity extends EntityPathBase<NewsEntity> {

    private static final long serialVersionUID = 118760155L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QNewsEntity newsEntity = new QNewsEntity("newsEntity");

    public final QDetailCodeEntity detailCode;

    public final StringPath NEW_CONTENT = createString("NEW_CONTENT");

    public final DateTimePath<java.time.LocalDateTime> NEW_DATE = createDateTime("NEW_DATE", java.time.LocalDateTime.class);

    public final StringPath NEW_NAME = createString("NEW_NAME");

    public final NumberPath<Long> NEW_NO = createNumber("NEW_NO", Long.class);

    public QNewsEntity(String variable) {
        this(NewsEntity.class, forVariable(variable), INITS);
    }

    public QNewsEntity(Path<? extends NewsEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QNewsEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QNewsEntity(PathMetadata metadata, PathInits inits) {
        this(NewsEntity.class, metadata, inits);
    }

    public QNewsEntity(Class<? extends NewsEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.detailCode = inits.isInitialized("detailCode") ? new QDetailCodeEntity(forProperty("detailCode"), inits.get("detailCode")) : null;
    }

}

