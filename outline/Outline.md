# Pipemodoro(timers, labels, page, account?)
- NavigationBar(pages) $\rightarrow$ Pipemodoro(timers, labels, new_page)


## TimersPage(timers, labels)

### TimerCreator(labels)
- TimerTypeSelector(pomodoro_types) $\rightarrow$ type
- StillTimer(duration(type))
- LabelSelector(labels) $\rightarrow$ selected_label
- StartButton $\rightarrow$ Pipemodoro(new:timers, labels, TimersPage)

### TimerStarted(active_timer(timers))
- TimerTypeShower(pomdoro_type(active_timer))
- ActiveTimer(active_timer, current_time()) $\rightarrow$ Pipemodoro(timers, labels, TimersPage)  
- CancelButton(active_timer) $\rightarrow$ Pipemodoro(set_canceled(active_timer, timers), labels, TimersPage)


## LabelsPage(timers, labels)
- CreateLabel $\rightarrow$ Pipemodoro(timers, new:labels, LabelsPage)

### UnselectedLabel(labels)
- LabelsList(labels) $\rightarrow$ SelectedLabel(labels, selected_label)

### SelectedLabel(labels, selected_label)
- LabelsList(labels) $\rightarrow$ SelectedLabel(labels, selected_label)
- LabelsInfoCard(selected_label, info(timers, selected_label))
- DeleteLabel(selected_label) $\rightarrow$ Pipemodoro(timers, remove(labels, selected_label), LabelsPage)


## AccountPage(account?)

### LoginForm()
- Greeting
- EmailField $\rightarrow$ email
- PasswordField $\rightarrow$ password
- LoginButton $\rightarrow$ Loading(promise)

### AccountInfo(account)
- AccountDisplay(account)
- AccountStats(timers, labels)
  - TimeSelector(time_frames) $\rightarrow$ time_frame
  - StatsList(timers, labels, time_frame)

### Loading(promise)
- resolve(promise) $\rightarrow$ AccountInfo(resolve(promise))
- error(promise) $\rightarrow$ ErroredForm(error(promise))

### ErroredForm(error)
- ErrorShower(error)
- LoginForm()