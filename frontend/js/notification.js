function askNotificationPermission() {
	if(!Notification) {
		alert(L__DESKTOP_NOTIFICATIONS_NOT_SUPPORTED);
		return;
	}
	if(Notification.permission !== 'granted') {
		Notification.requestPermission().then(function(result) {
			if(result === 'denied') {
				alert(L__DESKTOP_NOTIFICATIONS_DENIED);
			}
			if(result === 'granted') {
				// start watching for notifications
				setInterval(refreshNotificationInfo, 5000);
			}
		});
	} else {
		alert(L__DESKTOP_NOTIFICATIONS_ALREADY_PERMITTED);
	}
}

// permission already granted
// automatically start watching for notifications
if(Notification && Notification.permission === 'granted') {
	setInterval(refreshNotificationInfo, 5000);
}

notificationInfo = null;
function refreshNotificationInfo() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState != 4) return;
		if(this.status == 200) {
			checkNotification(JSON.parse(this.responseText));
		}
	};
	xhttp.open('GET', 'views/notification-info.php', true);
	xhttp.send();
}

function checkNotification(newNotificationInfo) {
	if(notificationInfo != null) {
		newNotificationInfo['job_container'].forEach(function(item1) {
			notificationInfo['job_container'].forEach(function(item2) {
				if(item1.id == item2.id) {
					if(item1.state != item2.state) {
						notify(item1.name+': '+item1.state_description, L__JOB_CONTAINER_STATUS_CHANGED, 'img/job.dyn.svg',
							'index.php?explorer-content='+encodeURIComponent('views/job-container.php?id='+item1.id)
						);
					}
				}
			});
		});
	}
	notificationInfo = newNotificationInfo;
}

function notify(title, body, icon, link) {
	if(Notification.permission !== 'granted') return;
	var notification = new Notification(title, {
		icon: icon, body: body,
	});
	notification.onclick = function() {
		window.open(link);
  };
}