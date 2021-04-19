$(function(){
var bookmark = document.getElementById("card-info-btn");
bookmark.setAttribute('onclick', 'bookmarkClick()');
})
function bookmarkClick(){
	const bg = document.documentElement.getAttribute('data-theme') === 'light' ? GLOBAL_CONFIG.Snackbar.bgLight : GLOBAL_CONFIG.Snackbar.bgDark
	Snackbar.show({text: '按 CTRL+ D 键将本页加入书签.',actionText: '',backgroundColor: bg});
}
