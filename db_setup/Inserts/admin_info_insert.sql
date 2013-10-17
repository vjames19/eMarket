INSERT INTO `emarket_test`.`admin_info`
(`admin_id`, `admin_user_name`, `admin_password`, `admin_email`, `admin_first_name`, `admin_middle_name`, `admin_last_name`, `admin_telephone`, `admin_is_root`, `admin_account_status`)
VALUES
(NULL, LCASE('root'), SHA1('root_pwd'), LCASE('root@emarket.com'), 'Edward', NULL, 'Snowden', '5594452854', '1', '1'),
(NULL, LCASE('Stuxnet'), SHA1('stuxnet_pwd'), LCASE('stuxnet@emarket.com'), 'Adolf', NULL, 'Hitler', '8322393739', '0', '1'),
(NULL, LCASE('Zeus'), SHA1('zeus_pwd'), LCASE('zeus@emarket.com'), 'Genghis', NULL, 'Khan', '4352325582', '0', '1'),
(NULL, LCASE('PoisonIvy'), SHA1('poisonivy_pwd'), LCASE('poisonivy@emarket.com'), 'Judas', NULL, 'Iscariot', '4844507730', '0', '1'),
(NULL, LCASE('Fizzer'), SHA1('fizzer_pwd'), LCASE('fizzer@emarket.com'), 'Osama', 'Bin', 'Laden', '4177361304', '0', '1'),
(NULL, LCASE('Slammer'), SHA1('slammer_pwd'), LCASE('slammer@emarket.com'), 'Saddam', NULL, 'Hussein', '7087501060', '0', '1'),
(NULL, LCASE('AirCop'), SHA1('aircop_pwd'), LCASE('aircop@emarket.com'), 'Jack', 'The', 'Ripper', '5306620877', '0', '1'),
(NULL, LCASE('ZMist'), SHA1('zmist_pwd'), LCASE('zmist@emarket.com'), 'Vlad', 'The', 'Impaler', '4052966808', '0', '1'),
(NULL, LCASE('Actifed'), SHA1('actified_pwd'), LCASE('actified@emarket.com'), 'Lee', 'Harvey', 'Oswald', '5419158963', '0', '1'),
(NULL, LCASE('Acid'), SHA1('acid_pwd'), LCASE('acid@emarket.com'), 'Joseph', NULL, 'Stalin', '5093553985', '0', '1'),
(NULL, LCASE('Zotob'), SHA1('zotob_pwd'), LCASE('zotob@emarket.com'), 'Reinhard', NULL, 'Heydrich', '3106376651', '0', '1'),
(NULL, LCASE('Badtrans'), SHA1('badtrans_pwd'), LCASE('badtrans@emarket.com'), 'Heinrich', NULL, 'Himmler', '6095778316', '0', '1'),
(NULL, LCASE('Doomjuice'), SHA1('doomjuice_pwd'), LCASE('doomjuice@emarket.com'), 'Kim', NULL, 'Sung', '6097124122', '0', '1'),
(NULL, LCASE('NGRBot'), SHA1('ngrbot_pwd'), LCASE('ngrbot@emarket.com'), 'Tomas', 'De', 'Torquemada', '8433657089', '0', '1'),
(NULL, LCASE('SpyEye'), SHA1('spyeye_pwd'), LCASE('spyeye@emarket.com'), 'Ayatollah', 'Ruhollah', 'Khomeini', '3103222475', '0', '1');
