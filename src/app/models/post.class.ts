export class Post{
	public _id:any;
	public tags:any[];
	public profile:any;
	public content:any;
	public created:Date;
	public imgs:any[];
	public comments:any;
	public likes:any;
	public isLiked:boolean;

	constructor(_id,tags,profile,content,created,imgs,comments,likes){
		this._id = _id;
		this.tags = tags;
		this.profile = profile;
		this.content = content;
		this.created = created;
		this.imgs = imgs;
		this.comments = comments;
		this.likes = likes;
		this.isLiked=false;
	}
}