for the db:
	db schema:
	-user:
		id: UUID
		user_name: unique (can not contain space and special characters because this is also used in urls as slug)
		email: unique (I want to only allow login with one time codes I send via mail, login is saved not in db but only in the clients cookie)
		is_admin: false
		is_moderator: false
		created_at: datetime
	-course:
		id: UUID
		title: str
		slug: str (automatically the title in lowercase with - replacing spaces)
		description: str
		order: int
		created_at: datetime
		changed_at: datetime
	-lecture:
		id: UUID
		course_id: UUID
		title: str
		slug: str (automatically the title in lowercase with - replacing spaces)
		content: str (probably just a markdown, or would something else make more sense?) I also want to embed youtube videos and probably other widgets later
		order: int
		created_at: datetime
		changed_at: datetime
	-comment:
		id: UUID
		lecture_id: UUID
		type: [text, image]
		content: [json] 
		user_likes: [] what users liked this comment
		user_dislikes: [] same
		parent_comment: UUID was this comment an answer to another comment?
		order: int (is this even necessary because order would not change?)
		created_at: datetime
		changed_at: datetime

