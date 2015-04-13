/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <IBMPush/IBMPush.h>
#import <IBMPush/IBMPushAppMgr.h>
#import <IBMBluemix/IBMBluemix.h>

#import "RCTRootView.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  
  UIUserNotificationType userNotificationTypes = (UIUserNotificationTypeAlert |
                                                  UIUserNotificationTypeBadge |
                                                  UIUserNotificationTypeSound);
  UIUserNotificationSettings *settings = [UIUserNotificationSettings
                                          settingsForTypes:userNotificationTypes
                                          categories:nil];
  [application registerUserNotificationSettings:settings];
  [application registerForRemoteNotifications];
  

  // Loading JavaScript code - uncomment the one you want.

  // OPTION 1
  // Load from development server. Start the server from the repository root:
  //
  // $ npm start
  //
  // To run on device, change `localhost` to the IP address of your computer, and make sure your computer and
  // iOS device are on the same Wi-Fi network.
  //jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];

  // OPTION 2
  // Load from pre-bundled file on disk. To re-generate the static bundle, run
  //
  // $ curl 'http://localhost:8081/index.ios.bundle?dev=false&minify=true' -o iOS/main.jsbundle
  //
  // and uncomment the next following line
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"transientwatch"
                                                   launchOptions:launchOptions];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [[UIViewController alloc] init];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

-(void) application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken{
  [IBMBluemix initializeWithApplicationId: @"c178f6c2-be4b-4a14-a16d-ecb00da18089"
                     andApplicationSecret: @"96cdaf6a61c377a6301c7022288236d30c41c290"
                      andApplicationRoute: @"http://transientwatch-push.mybluemix.net"];
  IBMPush *pushService = [IBMPush initializeService];
  if(pushService != nil){
    [[pushService registerDevice:@"testalias" withConsumerId:@"testconsumerid"
                 withDeviceToken:deviceToken.description]  continueWithBlock:^id(BFTask *task) {
      if(task.error){
          NSLog(task.error.description);
      }else{
        NSDictionary *result = task.result;
        [[pushService getSubscriptions] continueWithBlock:^id (BFTask *task){
          if(task.error){
            NSLog(task.error.description);
          }else{
            NSDictionary *subscriptions = [task.result objectForKey:@"subscriptions"];
            if (subscriptions.count == 0){
              [[pushService getTags] continueWithBlock:^id (BFTask *task) {
                if (task.error){
                  NSLog(task.error.description);
                }else{
                  NSArray* tags =[task.result objectForKey:@"tags"];
                  NSDictionary *result = task.result;
                  if(tags.count == 0){
                    NSLog(@"No Tags available");
                  }else{
                    //subscribing to the first tag available.
                    NSString *tag = @"all";
                    [[pushService subscribeToTag:tag] continueWithBlock:^id (BFTask *task){
                      if (task.error){
                          NSLog(task.error.description);
                      }else{
                        NSDictionary *result = task.result;
                      }
                      return nil;
                    }];
                  }
                }
                return nil;
              }];
            }else{
              NSLog(@"Subscribed");
            }
          }
          return nil;
        }];
      }
      return nil;
    }];
  }else{
    NSLog(@"Push Service is nil. Possible wrong classname");
  }

}

- (void)application:(UIApplication*)application didFailToRegisterForRemoteNotificationsWithError:(NSError*)error
{
  NSLog(@"Failed to get token from APNS, error: %@", error);
}

//- (void)application:(UIApplication*)application didReceiveRemoteNotification:(NSDictionary*)userInfo
//{
//  // add this module to collect metrics for Notification received, Notification displayed and Notification clicked when app is in background.
//  [[IBMPushAppMgr get] notificationReceived : userInfo];
//  
//  if ( application.applicationState == UIApplicationStateInactive || application.applicationState == UIApplicationStateBackground  )
//  {
//    [[IBMPushAppMgr get]appOpenedFromNotificationClickInBackground : userInfo];
//  }
//  
//}

//- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
//  // Store the deviceToken in the current installation and save it to Parse.
//  NSString *sToken = [[deviceToken description] stringByTrimmingCharactersInSet:[NSCharacterSet characterSetWithCharactersInString:@"<>"]];
//  sToken = [sToken stringByReplacingOccurrencesOfString:@" " withString:@""];
//  NSLog(sToken);
//  NSLog(@"OK");
//}

@end
