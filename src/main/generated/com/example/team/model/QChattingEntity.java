package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChattingEntity is a Querydsl query type for ChattingEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChattingEntity extends EntityPathBase<ChattingEntity> {

    private static final long serialVersionUID = 358401422L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChattingEntity chattingEntity = new QChattingEntity("chattingEntity");

    public final ListPath<java.util.Map<String, Object>, SimplePath<java.util.Map<String, Object>>> chaLog = this.<java.util.Map<String, Object>, SimplePath<java.util.Map<String, Object>>>createList("chaLog", java.util.Map.class, SimplePath.class, PathInits.DIRECT2);

    public final QMemberEntity chaMem1;

    public final QMemberEntity chaMem2;

    public final NumberPath<Long> chaNo = createNumber("chaNo", Long.class);

    public QChattingEntity(String variable) {
        this(ChattingEntity.class, forVariable(variable), INITS);
    }

    public QChattingEntity(Path<? extends ChattingEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChattingEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChattingEntity(PathMetadata metadata, PathInits inits) {
        this(ChattingEntity.class, metadata, inits);
    }

    public QChattingEntity(Class<? extends ChattingEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chaMem1 = inits.isInitialized("chaMem1") ? new QMemberEntity(forProperty("chaMem1")) : null;
        this.chaMem2 = inits.isInitialized("chaMem2") ? new QMemberEntity(forProperty("chaMem2")) : null;
    }

}

