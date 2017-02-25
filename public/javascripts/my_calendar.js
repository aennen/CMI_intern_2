$(window).load( function() {

                $('#mycalendar').monthly({
                    mode: 'event',
                    xmlUrl: 'events.xml'
                });

                $('#mycalendar2').monthly({
                    mode: 'picker',
                    setWidth: '30%',
                    target: '#mytarget',
                    showTrigger: '#mytarget',
                    startHidden: true,
                    showTrigger: '#mytarget',
                    stylePast: true,
                    disablePast: true
                });

            switch(window.location.protocol) {
            case 'http:':
            case 'https:':
            // running on a server, should be good.
            break;
            case 'file:':
            alert('Just a heads-up, events will not work when run locally.');
            }

            });

