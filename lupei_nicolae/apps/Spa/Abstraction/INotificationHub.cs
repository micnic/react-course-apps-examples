using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Spa.Hubs;

namespace Spa.Abstraction
{
	public interface INotificationHub
	{
		/// <summary>
		/// Send email notification to users
		/// </summary>
		/// <param name="userEmailNotification"></param>
		void SentEmailNotification(SignalrEmail userEmailNotification);
	}
}
