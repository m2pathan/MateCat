<?php
/**
 * Created by PhpStorm.
 * @author domenico domenico@translated.net / ostico@gmail.com
 * Date: 10/04/17
 * Time: 20.14
 *
 */

namespace Translators;

use DataAccess_AbstractDaoSilentStruct;
use DataAccess_IDaoStruct;

class JobsTranslatorsStruct extends DataAccess_AbstractDaoSilentStruct implements DataAccess_IDaoStruct {

    public $id_job;
    public $job_password;
    public $id_translator_profile;
    public $email;
    public $added_by;
    public $delivery_date;
    public $source;
    public $target;

}