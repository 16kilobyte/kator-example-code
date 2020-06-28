import { Column, Entity, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, Index } from 'typeorm';

@Entity()
@Index(['title', 'authors', 'publicationDate'], { fulltext: true })
export class Book {

  @PrimaryColumn({
    unsigned: true,
    type: 'int4',
  })
  public id: number;

  @Column()
  @Index()
  public title: string;

  @Column('simple-array', { nullable: true })
  @Index({ fulltext: true })
  public authors?: string[];

  @Column()
  public language?: string;

  @Column()
  @Index()
  public publicationDate?: Date;

  @Column()
  public licenseRights?: string;

  @Column('simple-array')
  public subjects?: string[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date; // For audit?
}
