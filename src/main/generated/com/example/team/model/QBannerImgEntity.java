package com.example.team.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBannerImgEntity is a Querydsl query type for BannerImgEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBannerImgEntity extends EntityPathBase<BannerImgEntity> {

    private static final long serialVersionUID = -1666421611L;

    public static final QBannerImgEntity bannerImgEntity = new QBannerImgEntity("bannerImgEntity");

    public final StringPath banCode = createString("banCode");

    public final ArrayPath<byte[], Byte> banImg = createArray("banImg", byte[].class);

    public final NumberPath<Integer> banNo = createNumber("banNo", Integer.class);

    public QBannerImgEntity(String variable) {
        super(BannerImgEntity.class, forVariable(variable));
    }

    public QBannerImgEntity(Path<? extends BannerImgEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBannerImgEntity(PathMetadata metadata) {
        super(BannerImgEntity.class, metadata);
    }

}

