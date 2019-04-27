export class Comment{
	public _id:any;
	public profile:any;
	public post:any;
	public content:any;
	public created:any;

	constructor(id,profile,post,content,created){
		this._id=id;
		this.profile=profile;
		this.post = post;
		this.content = content;
		this.created = created;
	}
}