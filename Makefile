add:
	git status
	git add .
	git status

# git commit -m "message"

trials:
	git push origin trials

main:
	git checkout master
	git branch
	git pull
	git checkout trials
